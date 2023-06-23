import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { Card } from "./Card"

@Entity({name: 'revenues'})
export class CardType {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @OneToMany(() => Card, card => card.type)
    cards: Card[]
}