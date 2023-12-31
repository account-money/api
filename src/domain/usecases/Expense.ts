import { BadRequest } from "@/application/errors/http";
import { CreateExpense, GetExpense, ShowExpense, UpdateExpense, Expense, DeleteExpense, IGetExpense, ICreateExpense, IUpdateExpense, IShowExpense, IDeleteExpense } from "@/domain/models/Expense";
import { AppDataSource } from "@/infra/database/data-source";
import { ExpenseRepository } from "@/infra/database/repositories/Expense";
import { v4 } from "uuid";
import { CardRepository } from "@/infra/database/repositories/Card";
import { RevenueRepository } from "@/infra/database/repositories/Revenue";

export class ExpenseUsecase implements IGetExpense, ICreateExpense, IUpdateExpense, IShowExpense, IDeleteExpense  {
    constructor(private readonly expenseRepo: ExpenseRepository, private readonly cardRepo: CardRepository, private readonly revenueRepo: RevenueRepository){}

    async insert(data: CreateExpense): Promise<any> {
        data.card = data.card ? data.card : undefined
        const card = await this.cardRepo.getById(String(data.card))
        if (card && card!.type!.id === 1 && card!.current! + data.amount! <= card!.limit!){
            const expenses = []
            const now = new Date()
            now.setDate(5)
            const monthDeadlineStart = now.getDate() >= Number(card.deadline!) ? now.getMonth() + 1 : now.getMonth()
            for (let i = 0 ; i < data.parcels! ; i++){
                const deadline = new Date(now.getFullYear(), monthDeadlineStart + i, Number(card.deadline!), 23, 59, 59)
                console.log(deadline)
                expenses.push(Object.assign({}, data, {deadline, parcelNumber: i+1}))
                console.log(expenses)
            }
            console.log(expenses)
            const expensesCreateds = Promise.all(expenses.map(expense => this.expenseRepo.insert(Object.assign({}, expense, {id: v4()}))))
            await this.cardRepo.update({id: card!.id, current: data.amount! + card!.current!})
            if (!expensesCreateds) throw new BadRequest('expense not created')
            return expensesCreateds
        }else if(card && card!.type!.id === 1 && card!.current! + data.amount! > card!.limit!) throw new BadRequest('unlimited')
        else if(card && card!.type!.id === 2){
            const allValuesRevenuesMonth = (await this.revenueRepo.getByUser(data.user!.id)).map(revenue => new Date(revenue.receivedAt!).getMonth() === new Date().getMonth() ? revenue.value! : 0)
            const amountRevenuesMonth = allValuesRevenuesMonth.reduce((all, current) => all + current, 0 )
            console.log(amountRevenuesMonth)
            if (data.amount! <= amountRevenuesMonth) {
                return await this.expenseRepo.insert(Object.assign({}, data, {id: v4(), deadline: new Date()}))
            }
            else throw new BadRequest('without balance')
        }else {
            const expense = await this.expenseRepo.insert(Object.assign({}, data, {id: v4(), deadline: new Date()}))
            if (!expense) throw new BadRequest('expense not created')
            return expense
        }

    }
    async update(data: UpdateExpense): Promise<Expense> {
        const expenseGet = await this.expenseRepo.getById(data.id)
        const expense = await this.expenseRepo.update(data)
        if (expense) return expense
        throw new BadRequest('expense not created')

    }
    async paid(data: {id: string}): Promise<Expense> {
        const expense = await this.expenseRepo.update({id: data.id, paidAt: true})
        if (expense!.paidAt){
            const card = await this.cardRepo.getById(expense!.card!.id!)
            await this.cardRepo.update({id:card!.id, current: card!.current! - expense!.amount!})
        }
        if (expense) return expense
        throw new BadRequest('expense not created')

    }
    async get(filter: GetExpense): Promise<Expense[]> {
        const expenses = await this.expenseRepo.getByUser(filter.user!.id)

        return expenses
        
    }
    async getStatistic(): Promise<Expense[]> {
        const expenses = await this.expenseRepo.get()

        return expenses
        
    }
    async show({id}: ShowExpense): Promise<Expense> {
        const expense = await this.expenseRepo.getById(id)
        if (expense) return expense
        throw new BadRequest('expense not created')

    }
    async delete({id}: DeleteExpense): Promise<Expense> {
        const expense = await this.expenseRepo.delete(id)
        console.log(expense)
        await this.cardRepo.update({id: expense!.card!.id, current:  expense!.card!.current! - expense!.amount!})
        if (expense) return expense
        throw new BadRequest('expense not created')

    }
}

export const expenseUsecase = new ExpenseUsecase(new ExpenseRepository(AppDataSource), new CardRepository(AppDataSource), new RevenueRepository(AppDataSource))