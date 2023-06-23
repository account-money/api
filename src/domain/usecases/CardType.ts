import {  CardType, IGetCardType } from "@/domain/models/CardType";
import { AppDataSource } from "@/infra/database/data-source";
import { CardTypeRepository } from "@/infra/database/repositories/CardType";
import { v4 } from "uuid";

export class CardTypeUsecase implements IGetCardType {
    constructor(private readonly cardTypeRepo: CardTypeRepository){}
    async get(): Promise<CardType[]> {
        return await this.cardTypeRepo.get()
    }
}

export const cardTypeUsecase = new CardTypeUsecase(new CardTypeRepository(AppDataSource))