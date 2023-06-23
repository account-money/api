import { CreateExpense, GetExpense, ShowExpense, UpdateExpense, Expense, DeleteExpense, IGetExpense, ICreateExpense, IUpdateExpense, IShowExpense, IDeleteExpense } from "@/domain/models/Expense";
import { AppDataSource } from "@/infra/database/data-source";
import { ExpenseRepository } from "@/infra/database/repositories/Expense";
import { v4 } from "uuid";

export class ExpenseUsecase implements IGetExpense, ICreateExpense, IUpdateExpense, IShowExpense, IDeleteExpense  {
    constructor(private readonly expenseRepo: ExpenseRepository){}
    async insert(data: CreateExpense): Promise<Expense> {
        return await this.expenseRepo.insert(Object.assign({}, data, {id: v4()}))
    }
    async update(data: UpdateExpense): Promise<Expense> {
        const expense = await this.show({id: data.id});
        return await this.expenseRepo.update(data)
    }
    async get(data?: GetExpense): Promise<Expense[]> {
        return await this.expenseRepo.get()
    }
    async show({id}: ShowExpense): Promise<Expense> {
        return await this.expenseRepo.getById(id)
    }
    async delete({id}: DeleteExpense): Promise<Expense> {
        return await this.expenseRepo.delete(id)
    }
}

export const expenseUsecase = new ExpenseUsecase(new ExpenseRepository(AppDataSource))