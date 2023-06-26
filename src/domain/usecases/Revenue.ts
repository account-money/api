import { CreateRevenue, GetRevenue, ShowRevenue, UpdateRevenue, Revenue, IGetRevenue, ICreateRevenue, IUpdateRevenue, IShowRevenue, IDeleteRevenue } from "@/domain/models/Revenue";
import { AppDataSource } from "@/infra/database/data-source";
import { RevenueRepository } from "@/infra/database/repositories/Revenue";
import { v4 } from "uuid";
import { DeleteExpense } from "../models/Expense";
import { BadRequest } from "@/application/errors/http";

export class RevenueUsecase implements IGetRevenue, ICreateRevenue, IUpdateRevenue, IShowRevenue, IDeleteRevenue  {
    constructor(private readonly revenueRepo: RevenueRepository){}
    async insert(data: CreateRevenue): Promise<Revenue> {
        const revenue = await this.revenueRepo.insert(Object.assign({}, data, {id: v4()}))
        if (revenue) return revenue
        throw new BadRequest('revenue not created');
    }
    async update(data: UpdateRevenue): Promise<Revenue> {
        const revenue = await this.revenueRepo.update(data)
        if (revenue) return revenue
        throw new BadRequest('user not updated')
    }
    async get(data?: GetRevenue): Promise<Revenue[]> {
        return await this.revenueRepo.get()
    }
    async show({id}: ShowRevenue): Promise<Revenue> {
        const revenue = await this.revenueRepo.getById(id)
        if (revenue) return revenue
        throw new BadRequest('user not found')

    }
    async delete({id}: DeleteExpense): Promise<Revenue> {
        const revenue =  await this.revenueRepo.delete(id)
        if (revenue) return revenue
        throw new BadRequest('user not deleted')

    }
}

export const revenueUsecase = new RevenueUsecase(new RevenueRepository(AppDataSource))