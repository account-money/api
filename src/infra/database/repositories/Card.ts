import { CreateCard, UpdateCard, Card } from "@/domain/models/Card";
import { Card as CardEntity } from "@/infra/database/entities/Card";
import { DataSource, Repository } from "typeorm";



export class CardRepository {
    private repo: Repository<CardEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(CardEntity)
    }
    public async get(){
        const cards = await this.repo.find({select: ['id', 'number', 'flag', 'limit', 'current', 'close', 'createdAt', 'updatedAt']});
        return cards
    }

    public async getById(id:string): Promise<Card>{
        const card = await this.repo.findOneOrFail({select: ['id', 'number', 'flag', 'limit', 'current', 'close', 'createdAt', 'updatedAt'], where: {id}, relations: ['type'] });
        return card
    }

    public async insert(data: CreateCard): Promise<Card>{
        const {id} = await this.repo.save(data);
        return this.repo.findOneOrFail({select: ['id', 'number', 'flag', 'limit', 'current', 'close',  'createdAt', 'updatedAt'], where: {id} })
    }

    public async update(data: UpdateCard): Promise<Card>{
        const {id} = await this.repo.save(data);
        return this.repo.findOneOrFail({select: ['id', 'number', 'flag', 'limit', 'current', 'close',  'createdAt', 'updatedAt'], where: {id} })
    }

    public async delete(id: string): Promise<Card>{
        return this.repo.findOneOrFail({select: ['id', 'number', 'flag', 'limit', 'current', 'close'], where: {id} })
    }
}