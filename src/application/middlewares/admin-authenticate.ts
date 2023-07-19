import { env } from "@/config/env";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { Forbbiden, Unauthorized } from "../errors/http";
import { UserRepository } from "@/infra/database/repositories/User";
import { AppDataSource } from "@/infra/database/data-source";

export class AuthenticateAdmin {
    private readonly userRepo = new UserRepository(AppDataSource)
    verify = async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) return res.status(Unauthorized._status).json({error: new Unauthorized().message})
        if(!jwt.verify(token, env.secret)) return res.status(Unauthorized._status).json({error: new Unauthorized().message})
        const payload = jwt.decode(token) as jwt.JwtPayload
        const user = await this.userRepo.getById(payload.id)
        console.log(user?.isAdmin)
        if (user && !user.isAdmin) return res.status(Forbbiden._status).json({error: new Forbbiden('Not permission').error})
        next()
    }
}
export const authenticateAdmin = new AuthenticateAdmin().verify