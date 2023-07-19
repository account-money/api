import { Card } from "./Card"
import { CategoryExpense } from "./CategoryExpense"
import { PaymentType } from "./PaymentType"
import { User } from "./User"

export type Expense = {
    id: string
    description?: string
    amount?: number
    card?: Card
    parcels?: number
    parcelNumber?: number
    deadline?: Date
    paidAt?: boolean
    category?: CategoryExpense
    user?: User
    paymentType?: PaymentType
    createdAt?: Date
    updatedAt?: Date
}

export type filterExpense = {
    description?: string
    amount?: number
    card?: Card
    parcels?: number
    deadline?: Date
    paidAt?: boolean
    category?: CategoryExpense
    user?: User
    month?: number
    paymentType?: PaymentType
    createdAt?: Date
    updatedAt?: Date

}

export type GetExpense = filterExpense
export type ShowExpense = {id: string}
export type CreateExpense = Omit<Expense, 'id' | 'createdAt' | 'updatedAt' >
export type UpdateExpense = Omit<Expense, 'user' | 'card' | 'createdAt' | 'updatedAt' >
export type DeleteExpense = {id: string}

export interface IGetExpense {
    get: (user: GetExpense) => Promise<Expense[]>
}

export interface IShowExpense {
    show: (user: ShowExpense) => Promise<Expense>
}

export interface ICreateExpense {
    insert: (user: CreateExpense) => Promise<Expense>
}

export interface IUpdateExpense {
    update: (user: UpdateExpense) => Promise<Expense>
}

export interface IDeleteExpense {
    delete: (user: DeleteExpense) => Promise<Expense>
}