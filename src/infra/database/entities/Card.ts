import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { User } from "./User"
import { CardType } from "./CardType"

@Entity({name: 'cards'})
export class Card {
    @PrimaryColumn()
    id: string

    @Column()
    number: number

    @Column()
    flag: string

    @Column({type: 'float'})
    limit: number

    @Column({name: 'current_value', type: 'float'})
    current: number

    @Column()
    close: Date

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
}