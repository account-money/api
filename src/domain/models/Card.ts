import { CardType } from "./CardType"
import { Expense } from "./Expense"
import { Revenue } from "./Revenue"
import { User } from "./User"

export type Card = {
    id: string
    number?: string
    flag?: string
    limit?: number
    current?: number
    close?: string
    deadline?: string
    expenses?: Expense[]
    type?: CardType
    user?: User
    createdAt?: Date
    updatedAt?: Date
}

export type GetCard = Card
export type ShowCard = {id: string}
export type CreateCard = Omit<Card, 'id' | 'createdAt' | 'updatedAt' | 'parcels'>
export type UpdateCard = Omit<Card, 'user' | 'createdAt' | 'updatedAt' | 'parcels'>
export type DeleteCard = {id: string}

export interface IGetCard {
    get: (data?: GetCard) => Promise<Card[]>
}

export interface IShowCard {
    show: (data: ShowCard) => Promise<Card>
}

export interface ICreateCard {
    insert: (data: CreateCard) => Promise<Card>
}

export interface IUpdateCard {
    update: (data: UpdateCard) => Promise<Card>
}

export interface IDeleteCard {
    delete: (data: DeleteCard) => Promise<Card>
}