import { Card } from "./Card"
import { Expense } from "./Expense"
import { Revenue } from "./Revenue"

export type User = {
    id: string
    name?: string
    email?: string
    password?: string
    token?: string
    isAdmin?: boolean
    isVerified?: boolean
    revenues?: Revenue[]
    cards?: Card[]
    expenses?: Expense[]
    createdAt?: string | Date
    updatedAt?: string | Date
}

export type GetUser = Omit<User, 'isVerified' | 'token'>
export type ShowUser = {id: string}
export type CreateUser = Omit<User, 'id' | 'isVerified' | 'isAdmin' | 'token' | 'createdAt' | 'updatedAt'>
export type UpdateUser = Omit<User, 'isVerified' | 'isAdmin' | 'createdAt' | 'updatedAt'>
export type DeleteUser = {id: string}

export interface IGetUser {
    get: (user?: GetUser) => Promise<User[]>
}

export interface IShowUser {
    show: (user: ShowUser) => Promise<User>
}

export interface ICreateUser {
    insert: (user: CreateUser) => Promise<User>
}

export interface IUpdateUser {
    update: (user: UpdateUser) => Promise<User>
}

export interface IDeleteUser {
    delete: (user: DeleteUser) => Promise<User>
}