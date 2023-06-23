import { CreateCategoryExpense, GetCategoryExpense, ShowCategoryExpense, UpdateCategoryExpense, CategoryExpense, DeleteCategoryExpense, IGetCategoryExpense, ICreateCategoryExpense, IUpdateCategoryExpense, IShowCategoryExpense, IDeleteCategoryExpense } from "@/domain/models/CategoryExpense";
import { AppDataSource } from "@/infra/database/data-source";
import { CategoryExpenseRepository } from "@/infra/database/repositories/CategoryExpense";
import { v4 } from "uuid";

export class CategoryExpenseUsecase implements IGetCategoryExpense, ICreateCategoryExpense, IUpdateCategoryExpense, IShowCategoryExpense, IDeleteCategoryExpense  {
    constructor(private readonly categoryExpenseRepo: CategoryExpenseRepository){}
    async insert(data: CreateCategoryExpense): Promise<CategoryExpense> {
        return await this.categoryExpenseRepo.insert(Object.assign({}, data, {id: v4()}))
    }
    async update(data: UpdateCategoryExpense): Promise<CategoryExpense> {
        const categoryExpense = await this.show({id: data.id});
        return await this.categoryExpenseRepo.update(data)
    }
    async get(data?: GetCategoryExpense): Promise<CategoryExpense[]> {
        return await this.categoryExpenseRepo.get()
    }
    async show({id}: ShowCategoryExpense): Promise<CategoryExpense> {
        return await this.categoryExpenseRepo.getById(id)
    }
    async delete({id}: DeleteCategoryExpense): Promise<CategoryExpense> {
        return await this.categoryExpenseRepo.delete(id)
    }
}

export const categoryExpenseUsecase = new CategoryExpenseUsecase(new CategoryExpenseRepository(AppDataSource))