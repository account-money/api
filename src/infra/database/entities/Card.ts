import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { User } from "./User"
import { CardType } from "./CardType"
import { Expense } from "./Expense"
import { Invoice } from "./Invoice"

@Entity({name: 'cards'})
export class Card {
    @PrimaryColumn()
    id: string

    @Column()
    number: string

    @Column()
    flag: string

    @Column({type: 'float', nullable: true})
    limit: number

    @Column({name: 'current_value', type: 'float', nullable: true})
    current: number

    @Column({nullable: true})
    close: string

    @Column({nullable: true})
    deadline: string

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @ManyToOne(() => CardType, type => type.cards)
    @JoinColumn({name: 'id_type', referencedColumnName: 'id'})
    type: CardType

    @ManyToOne(() => User, user => user.cards)
    @JoinColumn({name: 'id_user', referencedColumnName: 'id'})
    user: User

    @OneToMany(() => Expense, expense => expense.card)
    expenses: Expense[]

    @OneToMany(() => Invoice, invoice => invoice.card)
    invoices: Invoice[]
}