import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { Expense } from "./Expense"

@Entity({name: 'category_expenses'})
export class CategoryExpense {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @OneToMany(() => Expense, expense => expense.category)
    expenses: Expense[]
}