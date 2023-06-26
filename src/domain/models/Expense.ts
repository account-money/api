import { CategoryExpense } from "./CategoryExpense"
import { PaymentType } from "./PaymentType"
import { User } from "./User"

export type Expense = {
    id: string
    description?: string
    amount?: number
    parcels?: number
    parcelValue?: number
    deadline?: string | Date
    category?: CategoryExpense
    user?: User
    paymentType?: PaymentType
    createdAt?: string | Date
    updatedAt?: string | Date
}

export type GetExpense = Expense
export type ShowExpense = {id: string}
export type CreateExpense = Omit<Expense, 'id' | 'parcelValue' | 'createdAt' | 'updatedAt'>
export type UpdateExpense = Omit<Expense, 'user' | 'parcelValue' | 'createdAt' | 'updatedAt'>
export type DeleteExpense = {id: string}

export interface IGetExpense {
    get: (user?: GetExpense) => Promise<Expense[]>
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