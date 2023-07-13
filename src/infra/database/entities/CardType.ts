import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { Card } from "./Card"

@Entity({name: 'cards_type'})
export class CardType {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Card, card => card.type)
    cards: Card[]
}