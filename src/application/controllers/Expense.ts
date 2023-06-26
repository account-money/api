import { ExpenseUsecase, expenseUsecase } from "@/domain/usecases/Expense";
import { Request, Response } from "express";
import {z} from 'zod'
import { validateFields } from "../validation/field";
import { CreateExpense, DeleteExpense, GetExpense, Expense, ShowExpense, UpdateExpense } from "@/domain/models/Expense";
import { BadRequest, ServerError } from "../errors/http";


class ExpenseController {
    constructor(private readonly expenseUsecase: ExpenseUsecase){}

    insert = async(req: Request, res: Response): Promise<void> => {
        const expenseSchema = z.object({
            description: z.string(),
            amount: z.number(),
            parcels: z.number(),
            close: z.string(),
            deadline: z.string(),
            category: z.number(),
            paymentType: z.number(),
            user: z.string()
          });
        try {
            const data = validateFields<CreateExpense>(expenseSchema, Object.assign({}, req.body))
            const expense = await this.expenseUsecase.insert(data);
            res.json(expense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    get = async(req: Request, res: Response): Promise<void> => {
        const expenseSchema = z.object({
            description: z.string().optional(),
            amount: z.number().optional(),
            parcels: z.number().optional(),
            parcelValue: z.number().optional(),
            close: z.string().optional(),
            deadline: z.string().optional(),
            category: z.number().optional(),
            paymentType: z.number().optional(),
            user: z.string().optional()
          });
        try {
            const data = validateFields<GetExpense>(expenseSchema, req.body)
            const expense = await this.expenseUsecase.get(data);
            res.json(expense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    show = async(req: Request, res: Response): Promise<void> => {
        const expenseSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<ShowExpense>(expenseSchema, {id: req.params.id})
            const expense = await this.expenseUsecase.show({id});
            res.json(expense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    delete = async(req: Request, res: Response): Promise<void> => {
        const expenseSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<DeleteExpense>(expenseSchema, {id: req.params.id})
            const expense = await this.expenseUsecase.delete({id});
            res.json(expense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    update = async(req: Request, res: Response): Promise<void> => {
        const expenseSchema = z.object({
            description: z.string().optional(),
            amount: z.number().optional(),
            parcels: z.number().optional(),
            close: z.string().optional(),
            deadline: z.string().optional(),
            category: z.number().optional(),
            paymentType: z.number().optional(),
          });
        try {
            const data = validateFields<UpdateExpense>(expenseSchema, Object.assign({}, req.body, {id: req.params.id}))
            const expense = await this.expenseUsecase.update(data);
            res.json(expense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
}

export const expenseController = new ExpenseController(expenseUsecase)