import { CreateInvoice, Invoice } from "@/domain/models/Invoice";
import { Invoice as InvoiceEntity } from "@/infra/database/entities/Invoice";
import { DataSource, Repository } from "typeorm";



export class InvoiceRepository {
    private repo: Repository<InvoiceEntity>
    public constructor(appDataSource: DataSource){
        this.repo = appDataSource.getRepository(InvoiceEntity)
    }
    public async get(){
        const invoices = await this.repo.find({select: ['id', 'value']});
        return invoices
    }

    public async insert(data: CreateInvoice): Promise<Invoice | null>{
        const {id} = await this.repo.save(data);
        return this.repo.findOne({select: ['id', 'value'], where: {id} })
    }
}