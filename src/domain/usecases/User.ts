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
    async show({id}: ShowUser): Promise<User> {
        const user = await this.userRepo.getById(id)
        if (user) return user
        throw new BadRequest('Not found user')
    }
    async delete({id}: DeleteUser): Promise<User> {
        const user = await this.userRepo.delete(id)
        if (user) return user
        throw new BadRequest('user not deleted')

    }
}

export const userUsecase = new UserUsecase(new UserRepository(AppDataSource))