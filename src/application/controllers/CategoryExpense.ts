import { CategoryExpenseUsecase, categoryExpenseUsecase } from "@/domain/usecases/CategoryExpense";
import { Request, Response } from "express";
import {z} from 'zod'
import { validateFields } from "../validation/field";
import { CreateCategoryExpense, DeleteCategoryExpense, GetCategoryExpense, CategoryExpense, ShowCategoryExpense, UpdateCategoryExpense } from "@/domain/models/CategoryExpense";
import { BadRequest, ServerError } from "../errors/http";


class CategoryExpenseController {
    constructor(private readonly categoryExpenseUsecase: CategoryExpenseUsecase){}

    insert = async(req: Request, res: Response): Promise<void> => {
        const categoryExpenseSchema = z.object({
            name: z.string(),
            user: z.string()
          });
        try {
            const data = validateFields<CreateCategoryExpense>(categoryExpenseSchema, Object.assign({}, req.body))
            const categoryExpense = await this.categoryExpenseUsecase.insert(data);
            res.json(categoryExpense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    get = async(req: Request, res: Response): Promise<void> => {
        const categoryExpenseSchema = z.object({
            name: z.string().optional(),
          });
        try {
            const data = validateFields<GetCategoryExpense>(categoryExpenseSchema, req.body)
            const categoryExpense = await this.categoryExpenseUsecase.get(data);
            res.json(categoryExpense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    show = async(req: Request, res: Response): Promise<void> => {
        const categoryExpenseSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<ShowCategoryExpense>(categoryExpenseSchema, {id: req.params.id})
            const categoryExpense = await this.categoryExpenseUsecase.show({id});
            res.json(categoryExpense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    delete = async(req: Request, res: Response): Promise<void> => {
        const categoryExpenseSchema = z.object({
            id: z.string(),
          });
        try {
            const {id} = validateFields<DeleteCategoryExpense>(categoryExpenseSchema, {id: req.params.id})
            const categoryExpense = await this.categoryExpenseUsecase.delete({id});
            res.json(categoryExpense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
    update = async(req: Request, res: Response): Promise<void> => {
        const categoryExpenseSchema = z.object({
            id: z.string(),
            name: z.string().optional(),
          });
        try {
            const data = validateFields<UpdateCategoryExpense>(categoryExpenseSchema, Object.assign({}, req.body, {id: req.params.id}))
            const categoryExpense = await this.categoryExpenseUsecase.update(data);
            res.json(categoryExpense)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
}

export const categoryExpenseController = new CategoryExpenseController(categoryExpenseUsecase)