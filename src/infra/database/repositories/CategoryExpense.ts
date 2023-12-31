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

    public async getById(id:string): Promise<CategoryExpense | null>{
        const categoryExpense = await this.repo.findOne({select: ['id', 'name'], where: {id} });
        return categoryExpense
    }
    
    public async getByUser(user: string): Promise<CategoryExpense[]>{
        const revenues = await this.repo.find({select: ['id', 'name'], where: {user: {id: user}}, relations: ['user'] });
        return revenues
    }

    public async insert(data: CreateCategoryExpense): Promise<CategoryExpense | null>{
        const {id} = await this.repo.save(data);
        return this.repo.findOne({select: ['id', 'name'], where: {id} })
    }

    public async update(data: UpdateCategoryExpense): Promise<CategoryExpense | null>{
        const {id} = await this.repo.save(data);
        return this.repo.findOne({select: ['id', 'name'], where: {id} })
    }

    public async delete(id: string): Promise<CategoryExpense | any>{
        return this.repo.delete({id})
    }
}