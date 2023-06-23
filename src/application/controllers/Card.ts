import { CardUsecase, cardUsecase } from "@/domain/usecases/Card";
import { Request, Response } from "express";
import {z} from 'zod'
import { validateFields } from "../validation/field";
import { CreateCard, DeleteCard, GetCard, Card, ShowCard, UpdateCard } from "@/domain/models/Card";
import { BadRequest, ServerError } from "../errors/http";


class CardController {
    constructor(private readonly cardUsecase: CardUsecase){}

    insert = async(req: Request, res: Response): Promise<void> => {
        const cardSchema = z.object({
            flag: z.string(),
            number: z.number(),
            limit: z.number(),
            current: z.number(),
            close: z.date(),
            type: z.string(),
            user: z.string()
          });
        try {
            const data = validateFields<CreateCard>(cardSchema, Object.assign({}, req.body, {user: req.user}))
            const card = await this.cardUsecase.insert(data);
            res.json(card)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    get = async(req: Request, res: Response): Promise<void> => {
        const cardSchema = z.object({
            flag: z.string(),
            number: z.number(),
            limit: z.number(),
            current: z.number(),
            close: z.date(),
            type: z.string(),
            user: z.string()
          });
        try {
            const data = validateFields<GetCard>(cardSchema, req.body)
            const card = await this.cardUsecase.get(data);
            res.json(card)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    show = async(req: Request, res: Response): Promise<void> => {
        const cardSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<ShowCard>(cardSchema, {id: req.params.id})
            const card = await this.cardUsecase.show({id});
            res.json(card)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    delete = async(req: Request, res: Response): Promise<void> => {
        const cardSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<DeleteCard>(cardSchema, {id: req.params.id})
            const card = await this.cardUsecase.delete({id});
            res.json(card)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    update = async(req: Request, res: Response): Promise<void> => {
        const cardSchema = z.object({
            flag: z.string().optional(),
            number: z.number().optional(),
            limit: z.number().optional(),
            current: z.number().optional(),
            close: z.date().optional(),
            type: z.string().optional()
          });
        try {
            const data = validateFields<UpdateCard>(cardSchema, Object.assign({}, req.body, {user: req.user}, {id: req.params.id}))
            const card = await this.cardUsecase.update(data);
            res.json(card)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
}

export const cardController = new CardController(cardUsecase)