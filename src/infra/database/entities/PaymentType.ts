import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { Expense } from "./Expense"

@Entity({name: 'payments_type'})
export class PaymentType {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Expense, expense => expense.paymentType)
    expenses: Expense[]
}