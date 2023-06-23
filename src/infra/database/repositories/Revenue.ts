import { CreateRevenue, UpdateRevenue, Revenue } from "@/domain/models/Revenue";
import { Revenue as RevenueEntity } from "@/infra/database/entities/revenue";
import { DataSource, Repository } from "typeorm";



export class RevenueRepository {
    private repo: Repository<RevenueEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(RevenueEntity)
    }
    public async get(){
        const revenues = await this.repo.find({select: ['id', 'name', 'value', 'receveidAt', 'createdAt', 'updatedAt']});
        return revenues
    }

    public async getById(id:string): Promise<Revenue>{
        const revenue = await this.repo.findOneOrFail({select: ['id', 'name', 'value', 'receveidAt', 'createdAt', 'updatedAt'], where: {id}, relations: ['type'] });
        return revenue
    }

    public async insert(data: CreateRevenue): Promise<Revenue>{
        const {id} = await this.repo.save(data);
        return this.repo.findOneOrFail({select: ['id', 'name', 'value', 'receveidAt',  'createdAt', 'updatedAt'], where: {id} })
    }

    public async update(data: UpdateRevenue): Promise<Revenue>{
        const {id} = await this.repo.save(data);
        return this.repo.findOneOrFail({select: ['id', 'name', 'value', 'receveidAt',  'createdAt', 'updatedAt'], where: {id} })
    }

    public async delete(id: string): Promise<Revenue>{
        return this.repo.findOneOrFail({select: ['id', 'name', 'value', 'receveidAt'], where: {id} })
    }
}