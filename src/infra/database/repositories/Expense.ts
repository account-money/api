import { CreateExpense, UpdateExpense, Expense } from "@/domain/models/Expense";
import { Expense as ExpenseEntity } from "@/infra/database/entities/Expense";
import { DataSource, Repository } from "typeorm";



export class ExpenseRepository {
    private repo: Repository<ExpenseEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(ExpenseEntity)
    }
    public async get(){
        const expenses = await this.repo.find({select: ['id', 'description', 'amount', 'parcels', 'parcelValue', 'deadline', 'createdAt', 'updatedAt']});
        return expenses
    }

    public async getById(id:string): Promise<Expense>{
        const expense = await this.repo.findOneOrFail({select: ['id', 'description', 'amount', 'parcels', 'parcelValue', 'deadline', 'createdAt', 'updatedAt'], where: {id}, relations: ['paymentType', 'category'] });
        return expense
    }

    public async insert(data: CreateExpense): Promise<Expense>{
        const {id} = await this.repo.save(data);
        return this.repo.findOneOrFail({select: ['id', 'description', 'amount', 'parcels', 'parcelValue', 'deadline',  'createdAt', 'updatedAt'], where: {id} })
    }

    public async update(data: UpdateExpense): Promise<Expense>{
        const {id} = await this.repo.save(data);
        return this.repo.findOneOrFail({select: ['id', 'description', 'amount', 'parcels', 'parcelValue', 'deadline',  'createdAt', 'updatedAt'], where: {id} })
    }

    public async delete(id: string): Promise<Expense>{
        return this.repo.findOneOrFail({select: ['id', 'description', 'amount', 'parcels', 'parcelValue', 'deadline'], where: {id} })
    }
}