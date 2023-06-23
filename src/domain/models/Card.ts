import { CardType } from "./CardType"
import { Revenue } from "./Revenue"
import { User } from "./User"

export type Card = {
    id: string
    number?: number
    flag?: string
    limit?: number
    current?: number
    close?: String | Date
    type?: CardType
    user?: User
    createdAt?: string | Date
    updatedAt?: string | Date
}

export type GetCard = Card
export type ShowCard = {id: string}
export type CreateCard = Omit<Card, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCard = Omit<Card, 'user' | 'createdAt' | 'updatedAt'>
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