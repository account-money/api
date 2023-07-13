import { BadRequest } from "@/application/errors/http";
import { env } from "@/config/env";
import { ILogin, Login } from "@/domain/models/Login";
import { AppDataSource } from "@/infra/database/data-source";
import { UserRepository } from "@/infra/database/repositories/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class LoginUsecase implements ILogin {
    constructor(private readonly userRepo: UserRepository){}
    async login({email, password}: Login): Promise<any> {
        const user = await this.userRepo.getByEmail(email)
        if (user && await bcrypt.compare(password, user.password!)) return {user, token: jwt.sign({id: user.id, email: user.email}, env.secret, {expiresIn: '1d'})}
        throw new BadRequest('login failed')

    }
}

export const loginUsecase = new LoginUsecase(new UserRepository(AppDataSource))