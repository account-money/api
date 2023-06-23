import { CreateCard, GetCard, ShowCard, UpdateCard, Card, IGetCard, ICreateCard, IUpdateCard, IShowCard, IDeleteCard, DeleteCard } from "@/domain/models/Card";
import { AppDataSource } from "@/infra/database/data-source";
import { CardRepository } from "@/infra/database/repositories/Card";
import { v4 } from "uuid";

export class CardUsecase implements IGetCard, ICreateCard, IUpdateCard, IShowCard, IDeleteCard {
    constructor(private readonly cardRepo: CardRepository){}
    async insert(data: CreateCard): Promise<Card> {
        return await this.cardRepo.insert(Object.assign({}, data, {id: v4()}))
    }
    async update(data: UpdateCard): Promise<Card> {
        const card = await this.show({id: data.id});
        return await this.cardRepo.update(data)
    }
    async get(data?: GetCard): Promise<Card[]> {
        return await this.cardRepo.get()
    }
    async show({id}: ShowCard): Promise<Card> {
        return await this.cardRepo.getById(id)
    }
    async delete({id}: DeleteCard): Promise<Card> {
        return await this.cardRepo.delete(id)
    }
}

export const cardUsecase = new CardUsecase(new CardRepository(AppDataSource))