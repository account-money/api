import { Card } from "./Card"

export type Invoice = {
    id: string
    value?: number
    card?: Card
}

export type GetInvoice = Invoice
export type CreateInvoice = Invoice

export interface IGetInvoice {
    get: (user?: GetInvoice) => Promise<Invoice[]>
}
export interface ICreateInvoice {
    insert: (user: CreateInvoice) => Promise<Invoice>
}
