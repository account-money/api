import { env } from "@/config/env";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { Unauthorized } from "../errors/http";

export class Authenticate {
    verify = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization
        if (!token) return res.status(Unauthorized._status).json({error: new Unauthorized().message})
        if(!jwt.verify(token, env.secret)) return res.status(Unauthorized._status).json({error: new Unauthorized().message})
        next()
    }
}
export const authenticate = new Authenticate().verify