import { CardUsecase, cardUsecase } from "@/domain/usecases/Card";
import { Request, Response } from "express";
import {z} from 'zod'
import { validateFields } from "../validation/field";
import { CreateCard, DeleteCard, GetCard, Card, ShowCard, UpdateCard } from "@/domain/models/Card";
import { BadRequest, ServerError } from "../errors/http";
import {Expense} from "@/domain/models/Expense";

class CardController {
    constructor(private readonly cardUsecase: CardUsecase){}

    insert = async(req: Request, res: Response): Promise<void> => {
        const cardSchema = z.object({
            flag: z.string(),
            number: z.string(),
            limit: z.number().optional(),
            current: z.number().optional(),
            close: z.string().optional(),
            deadline: z.string().optional(),
            type: z.number(),
            user: z.string()
          });
        try {
            const data = validateFields<CreateCard>(cardSchema, Object.assign({}, req.body))
            const card = await this.cardUsecase.insert(data);
            res.json(card)
        }catch(e: any | unknown){
            console.log(e)
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    get = async(req: Request, res: Response): Promise<void> => {
        const cardSchema = z.object({
            flag: z.string().optional(),
            number: z.string().optional(),
            limit: z.number().optional(),
            current: z.number().optional(),
            close: z.string().optional(),
            type: z.number().optional(),
            user: z.string().optional()
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
    paid = async(req: Request, res: Response): Promise<void> => {
        const cardSchema = z.object({
            id: z.string(),
            expenses: z.any(),
            value: z.number()
          });
        try {
            const data = validateFields<{id: string, expenses: any, value: number}>(cardSchema, {id: req.params.id, ...req.body})
            const card = await this.cardUsecase.paid(data);
            res.json(card)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    invoice = async(req: Request, res: Response): Promise<void> => {
        const cardSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<ShowCard>(cardSchema, {id: req.params.id})
            const card = await this.cardUsecase.invoice({id});
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
            number: z.string().optional(),
            limit: z.number().optional(),
            current: z.number().optional(),
            close: z.string().optional(),
            deadline: z.string().optional(),
            type: z.number().optional()
          });
        try {
            const data = validateFields<UpdateCard>(cardSchema, Object.assign({}, req.body, {id: req.params.id}))
            const card = await this.cardUsecase.update(data);
            res.json(card)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
}

export const cardController = new CardController(cardUsecase)