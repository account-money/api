import { CreateUser, DeleteUser, GetUser, ICreateUser, IDeleteUser, IGetUser, IShowUser, IUpdateUser, ShowUser, UpdateUser, User } from "@/domain/models/User";
import { AppDataSource } from "@/infra/database/data-source";
import { UserRepository } from "@/infra/database/repositories/User";
import { v4 } from "uuid";
import bcrypt from 'bcrypt'
import { env } from "@/config/env";
import { BadRequest } from "@/application/errors/http";
import jwt from "jsonwebtoken";

export class UserUsecase implements IGetUser, ICreateUser, IUpdateUser, IShowUser, IDeleteUser  {
    constructor(private readonly userRepo: UserRepository){}
    async insert(data: CreateUser): Promise<any> {
        data.password = await bcrypt.hash(data.password!, env.salt)
        const user =  await this.userRepo.insert(Object.assign({}, data, {id: v4()}))
        if (user) return {user, token: jwt.sign({id: user.id, email: user.email}, env.secret, {expiresIn: '1d'})}
        throw new BadRequest('user not created')

    }
    async update(data: UpdateUser): Promise<User> {
        const user = await this.show({id: data.id});
        const password = data.password ? await bcrypt.hash(data.password, env.salt) : user.password
        const userUpdated = await this.userRepo.update(Object.assign({}, data, {password}))
        if (userUpdated) return userUpdated
        throw new BadRequest('user not updated')

    }
    async get(data?: GetUser): Promise<User[]> {
        return await this.userRepo.get()
    }
    async show ({id, month}: ShowUser & {month?: number}): Promise<User> {
        const user = await this.userRepo.getById(id)
        if (!user) throw new BadRequest('Not found user')

        if (month){
            const dayOne = new Date()
            dayOne.setMonth(month-1)
            dayOne.setDate(1)
            dayOne.setHours(0)
            dayOne.setMinutes(0)
            dayOne.setSeconds(0)
            dayOne.setMilliseconds(0)
            
            const lastDay = new Date()
            lastDay.setMonth(month)
            lastDay.setDate(0)
            dayOne.setHours(23)
            dayOne.setMinutes(59)
            dayOne.setSeconds(59)

            if (user.expenses && user.expenses.length > 0){
                const expensesMonth = user.expenses.filter(expense => new Date(expense.deadline!).getTime() >= (dayOne.getTime() - 1000*60*60*3) && new Date(expense.deadline!).getTime() <= (lastDay.getTime()-1000*60*60*3))
                user.expenses = expensesMonth
            }
            if (user.revenues && user.revenues.length > 0){
                const revenuesMonth = user.revenues.filter(revenues => new Date(revenues.createdAt!).getTime() >= (dayOne.getTime() - 1000*60*60*3) && new Date(revenues.createdAt!).getTime() <= (lastDay.getTime()-1000*60*60*3))
                user.revenues = revenuesMonth
            }

        }
        return user
        
    }
    async delete({id}: DeleteUser): Promise<User> {
        const user = await this.userRepo.delete(id)
        if (user) return user
        throw new BadRequest('user not deleted')

    }
}

export const userUsecase = new UserUsecase(new UserRepository(AppDataSource))