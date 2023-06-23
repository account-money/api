import { RevenueUsecase, revenueUsecase } from "@/domain/usecases/Revenue";
import { Request, Response } from "express";
import {z} from 'zod'
import { validateFields } from "../validation/field";
import { CreateRevenue, DeleteRevenue, GetRevenue, Revenue, ShowRevenue, UpdateRevenue } from "@/domain/models/Revenue";
import { BadRequest, ServerError } from "../errors/http";


class RevenueController {
    constructor(private readonly revenueUsecase: RevenueUsecase){}

    insert = async(req: Request, res: Response): Promise<void> => {
        const revenueSchema = z.object({
            name: z.string(),
            value: z.number(),
            receivedAt: z.date(),
            user: z.string()
          });
        try {
            const data = validateFields<CreateRevenue>(revenueSchema, Object.assign({}, req.body, {user: req.user}))
            const revenue = await this.revenueUsecase.insert(data);
            res.json(revenue)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    get = async(req: Request, res: Response): Promise<void> => {
        const revenueSchema = z.object({
            name: z.string(),
            value: z.number(),
            receivedAt: z.date(),
            user: z.string()
          });
        try {
            const data = validateFields<GetRevenue>(revenueSchema, req.body)
            const revenue = await this.revenueUsecase.get(data);
            res.json(revenue)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    show = async(req: Request, res: Response): Promise<void> => {
        const revenueSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<ShowRevenue>(revenueSchema, {id: req.params.id})
            const revenue = await this.revenueUsecase.show({id});
            res.json(revenue)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    delete = async(req: Request, res: Response): Promise<void> => {
        const revenueSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<DeleteRevenue>(revenueSchema, {id: req.params.id})
            const revenue = await this.revenueUsecase.delete({id});
            res.json(revenue)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    update = async(req: Request, res: Response): Promise<void> => {
        const revenueSchema = z.object({
            name: z.string().optional(),
            value: z.number().optional(),
            receivedAt: z.date().optional()
          });
        try {
            const data = validateFields<UpdateRevenue>(revenueSchema, Object.assign({}, req.body, {user: req.user}, {id: req.params.id}))
            const revenue = await this.revenueUsecase.update(data);
            res.json(revenue)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
}

export const revenueController = new RevenueController(revenueUsecase)