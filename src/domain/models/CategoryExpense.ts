import { User } from "./User"

export type CategoryExpense = {
    id: string
    name?: string
    user?: User
}

export type GetCategoryExpense = CategoryExpense
export type ShowCategoryExpense = {id: string}
export type CreateCategoryExpense = Omit<CategoryExpense, 'id'>
export type UpdateCategoryExpense = CategoryExpense
export type DeleteCategoryExpense = {id: string}

export interface IGetCategoryExpense {
    get: (user?: GetCategoryExpense) => Promise<CategoryExpense[]>
}

export interface IShowCategoryExpense {
    show: (user: ShowCategoryExpense) => Promise<CategoryExpense>
}

export interface ICreateCategoryExpense {
    insert: (user: CreateCategoryExpense) => Promise<CategoryExpense>
}

export interface IUpdateCategoryExpense {
    update: (user: UpdateCategoryExpense) => Promise<CategoryExpense>
}

export interface IDeleteCategoryExpense {
    delete: (user: DeleteCategoryExpense) => Promise<CategoryExpense>
}