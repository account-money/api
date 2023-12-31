import { UserUsecase, userUsecase } from "@/domain/usecases/User";
import { Request, Response } from "express";
import {z} from 'zod'
import { validateFields } from "../validation/field";
import { CreateUser, DeleteUser, GetUser, ShowUser, UpdateUser, User } from "@/domain/models/User";
import { BadRequest, ServerError } from "../errors/http";


class UserController {
    constructor(private readonly userUsecase: UserUsecase){}

    insert = async(req: Request, res: Response): Promise<void> => {
        const userSchema = z.object({
            name: z.string().min(4),
            email: z.string().email(),
            password: z.string().min(8).max(50)
          });
        try {
            const data = validateFields<CreateUser>(userSchema, req.body)
            const user = await this.userUsecase.insert(data);
            res.json(user)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    get = async(req: Request, res: Response): Promise<void> => {
        const userSchema = z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
            password: z.string().min(8).max(50).optional(),
          });
        try {
            const data = validateFields<GetUser>(userSchema, req.body)
            const user = await this.userUsecase.get(data);
            res.json(user)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    show = async(req: Request, res: Response): Promise<void> => {
        const userSchema = z.object({
            id: z.string(),
            month: z.any().optional()
          });
        try {
            const {id, month} = validateFields<ShowUser>(userSchema, {id: req.params.id, month: Number(req.query.month)})
            const user = await this.userUsecase.show({id, month});
            res.json(user)
        }catch(e: any | unknown){
            console.log(e)
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    delete = async(req: Request, res: Response): Promise<void> => {
        const userSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<DeleteUser>(userSchema, {id: req.params.id})
            const user = await this.userUsecase.delete({id});
            res.json(user)
        }catch(e: any | unknown){
            console.log(e)
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    update = async(req: Request, res: Response): Promise<void> => {
        const userSchema = z.object({
            id: z.string(),
            name: z.string().optional(),
            email: z.string().email().optional(),
            password: z.string().min(8).max(50).optional(),
            token: z.string().optional()
          });
        try {
            const data = validateFields<UpdateUser>(userSchema, Object.assign({}, req.body, {id: req.params.id}))
            const user = await this.userUsecase.update(data);
            res.json(user)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
}

export const userController = new UserController(userUsecase)