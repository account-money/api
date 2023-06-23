import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { Revenue } from "./revenue"
import { Card } from "./Card"
import { Expense } from "./Expense"

@Entity({name: 'users'})
export class User {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    token?: string

    @Column({name: "is_verified", default: false})
    isVerified: boolean

    @Column({name: "is_admin", default: false})
    isAdmin: boolean

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @OneToMany(() => Revenue, revenue => revenue.user)
    revenues: Revenue[]

    @OneToMany(() => Card, card => card.user)
    cards: Card[]

    @OneToMany(() => Expense, expense => expense.user)
    expenses: Expense[]
}