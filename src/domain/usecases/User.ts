import { CreateUser, DeleteUser, GetUser, ICreateUser, IDeleteUser, IGetUser, IShowUser, IUpdateUser, ShowUser, UpdateUser, User } from "@/domain/models/User";
import { AppDataSource } from "@/infra/database/data-source";
import { UserRepository } from "@/infra/database/repositories/User";
import { v4 } from "uuid";
import bcrypt from 'bcrypt'
import { env } from "@/config/env";

export class UserUsecase implements IGetUser, ICreateUser, IUpdateUser, IShowUser, IDeleteUser  {
    constructor(private readonly userRepo: UserRepository){}
    async insert(data: CreateUser): Promise<User> {
        return await this.userRepo.insert(Object.assign({}, data, {id: v4()}))
    }
    async update(data: UpdateUser): Promise<User> {
        const user = await this.show({id: data.id});
        const password = data.password ? bcrypt.hash(data.password, env.salt) : user.password
        return await this.userRepo.update(Object.assign({}, data, {password}))
    }
    async get(data?: GetUser): Promise<User[]> {
        return await this.userRepo.get()
    }
    async show({id}: ShowUser): Promise<User> {
        return await this.userRepo.getById(id)
    }
    async delete({id}: DeleteUser): Promise<User> {
        return await this.userRepo.delete(id)
    }
}

export const userUsecase = new UserUsecase(new UserRepository(AppDataSource))