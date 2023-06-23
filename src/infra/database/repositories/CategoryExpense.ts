import { CreateCategoryExpense, UpdateCategoryExpense, CategoryExpense } from "@/domain/models/CategoryExpense";
import { CategoryExpense as CategoryExpenseEntity } from "@/infra/database/entities/CategoryExpense";
import { DataSource, Repository } from "typeorm";



export class CategoryExpenseRepository {
    private repo: Repository<CategoryExpenseEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(CategoryExpenseEntity)
    }
    public async get(){
        const categoryExpenses = await this.repo.find({select: ['id', 'name']});
        return categoryExpenses
    }

    public async getById(id:string): Promise<CategoryExpense>{
        const categoryExpense = await this.repo.findOneOrFail({select: ['id', 'name'], where: {id} });
        return categoryExpense
    }

    public async insert(data: CreateCategoryExpense): Promise<CategoryExpense>{
        const {id} = await this.repo.save(data);
        return this.repo.findOneOrFail({select: ['id', 'name'], where: {id} })
    }

    public async update(data: UpdateCategoryExpense): Promise<CategoryExpense>{
        const {id} = await this.repo.save(data);
        return this.repo.findOneOrFail({select: ['id', 'name'], where: {id} })
    }

    public async delete(id: string): Promise<CategoryExpense>{
        return this.repo.findOneOrFail({select: ['id', 'name'], where: {id} })
    }
}