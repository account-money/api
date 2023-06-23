import { CreateRevenue, GetRevenue, ShowRevenue, UpdateRevenue, Revenue, IGetRevenue, ICreateRevenue, IUpdateRevenue, IShowRevenue, IDeleteRevenue } from "@/domain/models/Revenue";
import { AppDataSource } from "@/infra/database/data-source";
import { RevenueRepository } from "@/infra/database/repositories/Revenue";
import { v4 } from "uuid";
import { DeleteExpense } from "../models/Expense";

export class RevenueUsecase implements IGetRevenue, ICreateRevenue, IUpdateRevenue, IShowRevenue, IDeleteRevenue  {
    constructor(private readonly revenueRepo: RevenueRepository){}
    async insert(data: CreateRevenue): Promise<Revenue> {
        return await this.revenueRepo.insert(Object.assign({}, data, {id: v4()}))
    }
    async update(data: UpdateRevenue): Promise<Revenue> {
        const revenue = await this.show({id: data.id});
        return await this.revenueRepo.update(data)
    }
    async get(data?: GetRevenue): Promise<Revenue[]> {
        return await this.revenueRepo.get()
    }
    async show({id}: ShowRevenue): Promise<Revenue> {
        return await this.revenueRepo.getById(id)
    }
    async delete({id}: DeleteExpense): Promise<Revenue> {
        return await this.revenueRepo.delete(id)
    }
}

export const revenueUsecase = new RevenueUsecase(new RevenueRepository(AppDataSource))