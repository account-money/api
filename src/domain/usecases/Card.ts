import { BadRequest } from "@/application/errors/http";
import { CreateCard, GetCard, ShowCard, UpdateCard, Card, IGetCard, ICreateCard, IUpdateCard, IShowCard, IDeleteCard, DeleteCard } from "@/domain/models/Card";
import { AppDataSource } from "@/infra/database/data-source";
import { CardRepository } from "@/infra/database/repositories/Card";
import { v4 } from "uuid";
import { Expense } from "../models/Expense";
import { ExpenseRepository } from "@/infra/database/repositories/Expense";
import { InvoiceRepository } from "@/infra/database/repositories/Invoice";

export class CardUsecase implements IGetCard, ICreateCard, IUpdateCard, IShowCard, IDeleteCard {
    constructor(private readonly cardRepo: CardRepository, private readonly expenseRepo: ExpenseRepository, private readonly InvoiceRepo: InvoiceRepository){}
    async insert(data: CreateCard): Promise<Card> {
        const card = await this.cardRepo.insert(Object.assign({}, data, {id: v4()}))
        if (card) return card
        throw new BadRequest('card not created')

    }
    async update(data: UpdateCard): Promise<Card> {
        const card = await this.cardRepo.update(data)
        if (card) return card
        throw new BadRequest('card not created')
    }
    async get(data?: GetCard): Promise<Card[]> {
        return await this.cardRepo.get()
    }
    async show({id}: ShowCard): Promise<Card> {
        const card = await this.cardRepo.getById(id)
        if (card) return card
        throw new BadRequest('card not created')
    }
    async paid({expenses, value, id}: {expenses: Expense[], value: number, id: string}): Promise<void> {
        const card = await this.cardRepo.getById(id)
        if (!card) throw new BadRequest('card not created')
        if (expenses && expenses.length){
            Promise.all(expenses.map(expense => {
                expense.paidAt = true
                return this.expenseRepo.update(expense)
            }))
        }
        this.cardRepo.update({id: card.id, current: card.current! - value})
        this.InvoiceRepo.insert({id: v4(), value, card: card})

        
    }
    async invoice({id}: ShowCard): Promise<any> {
        const card = await this.cardRepo.getById(id)
        if (!card) throw new BadRequest('card not created')
        if (card.expenses && card.expenses.length > 0){
            const now = new Date()
            const expensesInvoice = card.expenses.filter(expense => {
                const deadline = new Date(expense.deadline!)
                const cardStartInvoice = now.getDate() >= Number(card.close) ? new Date(now.getFullYear(), now.getMonth(), Number(card.close!), 0, 0, 0) : new Date(now.getFullYear(), now.getMonth() - 1, Number(card.close!), 0, 0, 0)
                const cardEndInvoice = now.getDate() >= Number(card.close) ? new Date(now.getFullYear(), now.getMonth() + 1, Number(card.close!) -1, 23, 59, 59) : new Date(now.getFullYear(), now.getMonth(), Number(card.close!)-1, 23, 59, 59)
                if (!expense.paidAt! && deadline.getTime() >= cardStartInvoice.getTime() && deadline.getTime() <= cardEndInvoice.getTime()) return expense
            })
            console.log(expensesInvoice)
            const expensesValues = expensesInvoice.map(expense => ({amount: expense.amount!, parcels: expense.parcels!}))
            const amounts = expensesValues.map(expense => expense.amount / expense.parcels)
            const allAmount = amounts.reduce((all, current) => all + current, 0)
            return {expenses: expensesInvoice, value: allAmount}
        }
        return card
        
    }
    async delete({id}: DeleteCard): Promise<Card> {
        const card = await this.cardRepo.delete(id)
        if (card) return card
        throw new BadRequest('card not created')
    }
}

export const cardUsecase = new CardUsecase(new CardRepository(AppDataSource), new ExpenseRepository(AppDataSource), new InvoiceRepository(AppDataSource))