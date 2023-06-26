import { NextFunction, Request, Response } from "express";

export class Authenticate {
    verify = (req: Request, res: Response, next: NextFunction) => {
        req.user = req.headers.id?.toString()
        next()
    }
}
export const authenticate = new Authenticate()