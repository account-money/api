import { BadRequest } from "@/application/errors/http";
import { CreateCard, GetCard, ShowCard, UpdateCard, Card, IGetCard, ICreateCard, IUpdateCard, IShowCard, IDeleteCard, DeleteCard } from "@/domain/models/Card";
import { AppDataSource } from "@/infra/database/data-source";
import { CardRepository } from "@/infra/database/repositories/Card";
import { v4 } from "uuid";

export class CardUsecase implements IGetCard, ICreateCard, IUpdateCard, IShowCard, IDeleteCard {
    constructor(private readonly cardRepo: CardRepository){}
    async insert(data: CreateCard): Promise<Card> {
        const card = await this.cardRepo.insert(Object.assign({}, data, {id: v4()}))
        if (card) return card
        throw new BadRequest('card not created')

    }
    async update(data: UpdateCard): Promise<Card> {
        const card = await this.cardRepo.update(data)
        if (card) return card
        throw new BadRequest('card not created')
    }
    async get(data?: GetCard): Promise<Card[]> {
        return await this.cardRepo.get()
    }
    async show({id}: ShowCard): Promise<Card> {
        const card = await this.cardRepo.getById(id)
        if (card) return card
        throw new BadRequest('card not created')
    }
    async delete({id}: DeleteCard): Promise<Card> {
        const card = await this.cardRepo.delete(id)
        if (card) return card
        throw new BadRequest('card not created')
    }
}

export const cardUsecase = new CardUsecase(new CardRepository(AppDataSource))