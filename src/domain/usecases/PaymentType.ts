import {  PaymentType, IGetPaymentType } from "@/domain/models/PaymentType";
import { AppDataSource } from "@/infra/database/data-source";
import { PaymentTypeRepository } from "@/infra/database/repositories/PaymentType";
import { v4 } from "uuid";

export class PaymentTypeUsecase implements IGetPaymentType {
    constructor(private readonly paymentTypeRepo: PaymentTypeRepository){}
    async get(): Promise<PaymentType[]> {
        return await this.paymentTypeRepo.get()
    }
}

export const paymentTypeUsecase = new PaymentTypeUsecase(new PaymentTypeRepository(AppDataSource))