import { User } from "./User"

export type Revenue = {
    id: string
    name?: string
    value?: number
    receivedAt?: String | Date
    createdAt?: string | Date
    updatedAt?: string | Date
    user?: User
}

export type GetRevenue = Revenue
export type ShowRevenue = {id: string}
export type CreateRevenue = Omit<Revenue, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateRevenue = Omit<Revenue, 'createdAt' | 'updatedAt'>
export type DeleteRevenue = {id: string}

export interface IGetRevenue {
    get: (user?: GetRevenue) => Promise<Revenue[]>
}

export interface IShowRevenue {
    show: (user: ShowRevenue) => Promise<Revenue>
}

export interface ICreateRevenue {
    insert: (user: CreateRevenue) => Promise<Revenue>
}

export interface IUpdateRevenue {
    update: (user: UpdateRevenue) => Promise<Revenue>
}

export interface IDeleteRevenue {
    delete: (user: DeleteRevenue) => Promise<Revenue>
}