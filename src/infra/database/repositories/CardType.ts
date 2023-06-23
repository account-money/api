import { CardType } from "@/domain/models/CardType";
import { CardType as CardTypeEntity } from "@/infra/database/entities/CardType";
import { DataSource, Repository } from "typeorm";



export class CardTypeRepository {
    private repo: Repository<CardTypeEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(CardTypeEntity)
    }
    public async get(){
        const cardType = await this.repo.find({select: ['id', 'name']});
        return cardType
    }
}