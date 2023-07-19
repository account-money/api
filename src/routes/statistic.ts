import { authenticateAdmin } from '@/application/middlewares/admin-authenticate'
import { cardUsecase } from '@/domain/usecases/Card'
import { expenseUsecase } from '@/domain/usecases/Expense'
import { invoiceUsecase } from '@/domain/usecases/Invoices'
import { revenueUsecase } from '@/domain/usecases/Revenue'
import axiosClient from 'axios'
import {Router} from 'express'

const router = Router()

router.get('/', authenticateAdmin, async (req, res) => {
    try{
        // Receita
        const revenues = (await revenueUsecase.getByUser(String(req.query.user))).filter(revenue => new Date(revenue.receivedAt!).getMonth() === new Date().getMonth())
        const revenuesValues = revenues.map(revenue => revenue.value!)
        const revenuesStatistics = await axiosClient.post('http://127.0.0.1:8000/statistic', {data: revenuesValues, name: 'Receita do mês'})

        // Limite Cartão de Crédito
        const cards = await cardUsecase.get()
        const cardsValues = cards.map(card => card.limit)
        const cardsStatistics = await axiosClient.post('http://127.0.0.1:8000/statistic', {data: cardsValues, name: 'Limite de Cartão de Crédito'})

        // Parcelas da Despesa
        const expenses = await expenseUsecase.getStatistic()
        const expensesOneParcel = expenses.filter(expense => (expense.paymentType!.id === 1 && expense.parcelNumber === 1) || (expense.paymentType!.id !== 1))
        const parcels = expensesOneParcel.map(expense => expense.parcels)
        const parcelsStatistics = await axiosClient.post('http://127.0.0.1:8000/statistic', {data: parcels, name: 'Número de parcelas por despesa'})

        // Valor da Despesa
        const amounts = expensesOneParcel.map(expense => expense.amount)
        const amountsStatistics = await axiosClient.post('http://127.0.0.1:8000/statistic', {data: amounts, name: 'Valor da despesa'})

        // Valor das faturas
        const invoices = await invoiceUsecase.get()
        const valueInvoices = invoices.map(invoice => invoice.value!)
        const invoicesStatistics = await axiosClient.post('http://127.0.0.1:8000/statistic', {data: valueInvoices, name: 'Valor da fatura'})

        res.json({result: [{title: 'Receita do mês', ...revenuesStatistics.data.statistic}, {title: 'Limite de Cartão de Crédito', ...cardsStatistics.data.statistic}, {title: 'Número de parcelas por despesa', ...parcelsStatistics.data.statistic}, {title: 'Valor da despesa', ...amountsStatistics.data.statistic}, {title: 'Valor da fatura', ...invoicesStatistics.data.statistic}]})
    }catch(e){
        console.log(e)
    }
})

export const routerStatistic = router