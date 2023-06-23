import { PaymentType } from "@/domain/models/PaymentType";
import { PaymentType as PaymentTypeEntity } from "@/infra/database/entities/PaymentType";
import { DataSource, Repository } from "typeorm";



export class PaymentTypeRepository {
    private repo: Repository<PaymentTypeEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(PaymentTypeEntity)
    }
    public async get(){
        const paymentType = await this.repo.find({select: ['id', 'name']});
        return paymentType
    }
}