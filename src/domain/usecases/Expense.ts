import { BadRequest } from "@/application/errors/http";
import { CreateExpense, GetExpense, ShowExpense, UpdateExpense, Expense, DeleteExpense, IGetExpense, ICreateExpense, IUpdateExpense, IShowExpense, IDeleteExpense } from "@/domain/models/Expense";
import { AppDataSource } from "@/infra/database/data-source";
import { ExpenseRepository } from "@/infra/database/repositories/Expense";
import { v4 } from "uuid";

export class ExpenseUsecase implements IGetExpense, ICreateExpense, IUpdateExpense, IShowExpense, IDeleteExpense  {
    constructor(private readonly expenseRepo: ExpenseRepository){}
    async insert(data: CreateExpense): Promise<Expense> {
        
        const expense = await this.expenseRepo.insert(Object.assign({}, data, {id: v4()}, {parcelValue: data.amount! / data.parcels!}))
        if (expense) return expense
        throw new BadRequest('expense not created')
    }
    async update(data: UpdateExpense): Promise<Expense> {
        const expense = await this.expenseRepo.update(data)
        if (expense) return expense
        throw new BadRequest('expense not created')

    }
    async get(data?: GetExpense): Promise<Expense[]> {
        return await this.expenseRepo.get()
    }
    async show({id}: ShowExpense): Promise<Expense> {
        const expense = await this.expenseRepo.getById(id)
        if (expense) return expense
        throw new BadRequest('expense not created')

    }
    async delete({id}: DeleteExpense): Promise<Expense> {
        const expense = await this.expenseRepo.delete(id)
        if (expense) return expense
        throw new BadRequest('expense not created')

    }
}

export const expenseUsecase = new ExpenseUsecase(new ExpenseRepository(AppDataSource))