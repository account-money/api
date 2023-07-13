import { CreateCard, UpdateCard, Card } from "@/domain/models/Card";
import { Card as CardEntity } from "@/infra/database/entities/Card";
import { DataSource, Repository } from "typeorm";



export class CardRepository {
    private repo: Repository<CardEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(CardEntity)
    }
    public async get(){
        const cards = await this.repo.find({select: ['id', 'number', 'flag', 'limit', 'current', 'close', 'deadline', 'createdAt', 'updatedAt'], relations: ['type', 'expenses']});
        return cards
    }

    public async getById(id:string): Promise<Card | null>{
        const card = await this.repo.findOne({select: ['id', 'number', 'flag', 'limit', 'current', 'close', 'deadline','createdAt', 'updatedAt'], where: {id}, relations: ['type', 'expenses'] });
        return card
    }

    public async insert(data: CreateCard): Promise<Card | null>{
        const {id} = await this.repo.save(data);
        return this.repo.findOne({select: ['id', 'number', 'flag', 'limit', 'current', 'close',  'deadline','createdAt', 'updatedAt'], where: {id} })
    }

    public async update(data: UpdateCard): Promise<Card | null>{
        const {id} = await this.repo.save(data);
        return this.repo.findOne({select: ['id', 'number', 'flag', 'limit', 'current', 'close',  'deadline','createdAt', 'updatedAt'], where: {id} })
    }

    public async delete(id: string): Promise<Card | any>{
        return this.repo.delete({id})
    }
}