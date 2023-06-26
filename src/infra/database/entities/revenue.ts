import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { User } from "./User"

@Entity({name: 'revenues'})
export class Revenue {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column({type: 'float'})
    value: number

    @Column({name: 'received_at'})
    receivedAt: Date

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @ManyToOne(() => User, user => user.revenues)
    @JoinColumn({name: 'id_user', referencedColumnName: 'id'})
    user: User
}