import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { Expense } from "./Expense"
import { User } from "./User"

@Entity({name: 'categories_expense'})
export class CategoryExpense {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @OneToMany(() => Expense, expense => expense.category)
    expenses: Expense[]

    @ManyToOne(() => User, user => user.categories)
    @JoinColumn({name: 'id_user', referencedColumnName: 'id'})
    user: User
}