import { BadRequest } from "@/application/errors/http";
import { CreateCategoryExpense, GetCategoryExpense, ShowCategoryExpense, UpdateCategoryExpense, CategoryExpense, DeleteCategoryExpense, IGetCategoryExpense, ICreateCategoryExpense, IUpdateCategoryExpense, IShowCategoryExpense, IDeleteCategoryExpense } from "@/domain/models/CategoryExpense";
import { AppDataSource } from "@/infra/database/data-source";
import { CategoryExpenseRepository } from "@/infra/database/repositories/CategoryExpense";
import { v4 } from "uuid";

export class CategoryExpenseUsecase implements IGetCategoryExpense, ICreateCategoryExpense, IUpdateCategoryExpense, IShowCategoryExpense, IDeleteCategoryExpense  {
    constructor(private readonly categoryExpenseRepo: CategoryExpenseRepository){}
    async insert(data: CreateCategoryExpense): Promise<CategoryExpense> {
        const expenseCategory = await this.categoryExpenseRepo.insert(Object.assign({}, data, {id: v4()}))
        if (expenseCategory) return expenseCategory
        throw new BadRequest('expense category not created')

    }
    async update(data: UpdateCategoryExpense): Promise<CategoryExpense> {
        const categoryExpense = await this.show({id: data.id});
        const expenseCategory = await this.categoryExpenseRepo.update(data)
        if (expenseCategory) return expenseCategory
        throw new BadRequest('expense category not created')

    }
    async get(data?: GetCategoryExpense): Promise<CategoryExpense[]> {
        return await this.categoryExpenseRepo.get()
    }

    async getByUser({user}: {user: string}): Promise<CategoryExpense[]> {
        return await this.categoryExpenseRepo.getByUser(user)
    }
    
    async show({id}: ShowCategoryExpense): Promise<CategoryExpense> {
        const expenseCategory = await this.categoryExpenseRepo.getById(id)
        if (expenseCategory) return expenseCategory
        throw new BadRequest('expense category not created')

    }
    async delete({id}: DeleteCategoryExpense): Promise<CategoryExpense> {
        const expenseCategory = await this.categoryExpenseRepo.delete(id)
        if (expenseCategory) return expenseCategory
        throw new BadRequest('expense category not created')

    }
}

export const categoryExpenseUsecase = new CategoryExpenseUsecase(new CategoryExpenseRepository(AppDataSource))