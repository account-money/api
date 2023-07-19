import { CreateInvoice, GetInvoice, Invoice, IGetInvoice, ICreateInvoice } from "@/domain/models/Invoice";
import { AppDataSource } from "@/infra/database/data-source";
import { InvoiceRepository } from "@/infra/database/repositories/Invoice";
import { v4 } from "uuid";
import { DeleteExpense } from "../models/Expense";
import { BadRequest } from "@/application/errors/http";

export class InvoiceUsecase implements IGetInvoice, ICreateInvoice {
    constructor(private readonly invoiceRepo: InvoiceRepository){}
    async insert(data: CreateInvoice): Promise<Invoice> {
        const invoice = await this.invoiceRepo.insert(Object.assign({}, data, {id: v4()}))
        if (invoice) return invoice
        throw new BadRequest('invoice not created');
    }
    async get(data?: GetInvoice): Promise<Invoice[]> {
        return await this.invoiceRepo.get()
    }
}

export const invoiceUsecase = new InvoiceUsecase(new InvoiceRepository(AppDataSource))