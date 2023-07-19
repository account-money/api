import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { User } from "./User"
import { Card } from "./Card"

@Entity({name: 'invoices'})
export class Invoice {
    @PrimaryColumn()
    id: string

    @Column({type: 'float'})
    value: number

    @ManyToOne(() => Card, card => card.invoices)
    @JoinColumn({name: 'id_card', referencedColumnName: 'id'})
    card: Card
}