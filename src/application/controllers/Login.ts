import { LoginUsecase, loginUsecase } from "@/domain/usecases/Login";
import { Request, Response } from "express";
import {z} from 'zod'
import { validateFields } from "../validation/field";
import { Login} from "@/domain/models/Login";
import { BadRequest, ServerError } from "../errors/http";


class LoginController {
    constructor(private readonly loginUsecase: LoginUsecase){}

    execute = async(req: Request, res: Response): Promise<void> => {
        const loginSchema = z.object({
            email: z.string(),
            password: z.string(),
          });
        try {
            const data = validateFields<Login>(loginSchema, Object.assign({}, req.body))
            const login = await this.loginUsecase.login(data);
            res.json(login)
        }catch(e: any | unknown){
            console.log(e)
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
}

export const loginController = new LoginController(loginUsecase)