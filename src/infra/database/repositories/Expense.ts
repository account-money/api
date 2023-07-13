import { CreateExpense, UpdateExpense, Expense } from "@/domain/models/Expense";
import { Expense as ExpenseEntity } from "@/infra/database/entities/Expense";
import { DataSource, Repository } from "typeorm";



export class ExpenseRepository {
    private repo: Repository<ExpenseEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(ExpenseEntity)
    }
    public async get(){
        const expenses = await this.repo.find({select: ['id', 'description', 'amount','parcels', 'card', 'createdAt', 'updatedAt']});
        return expenses
    }

    public async getById(id:string): Promise<Expense | null>{
        const expense = await this.repo.findOne({select: ['id', 'description', 'amount', 'parcels', 'card', 'createdAt', 'updatedAt'], where: {id}, relations: ['paymentType', 'category', 'card', 'card.type'] });
        return expense
    }

    public async getByUser(user: string): Promise<Expense[]>{
        const revenues = await this.repo.find({select: ['id', 'description', 'amount','parcels', 'card', 'createdAt', 'updatedAt'], where: {user: {id: user}}, relations: ['paymentType', 'category', 'card'] });
        return revenues
    }

    public async insert(data: CreateExpense): Promise<Expense | null>{
        const {id} = await this.repo.save(data);
        return this.repo.findOne({select: ['id', 'description', 'amount', 'card',  'createdAt', 'updatedAt'], where: {id} })
    }

    public async update(data: UpdateExpense): Promise<Expense | null>{
        const {id} = await this.repo.save(data);
        return this.repo.findOne({select: ['id', 'description', 'amount', 'card',  'createdAt', 'updatedAt'], where: {id} })
    }

    public async delete(id: string): Promise<Expense | any>{
        const expense = await this.getById(id)
        await this.repo.delete({id} )
        return expense
    }
}