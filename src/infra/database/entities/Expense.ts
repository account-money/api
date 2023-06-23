import { Entity, PrimaryColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm"
import { User } from "./User"
import { CategoryExpense } from "./CategoryExpense"
import { PaymentType } from "./PaymentType"

@Entity({name: 'expenses'})
export class Expense {
    @PrimaryColumn()
    id: string

    @Column()
    description: string

    @Column({type: 'float'})
    amount: number

    @Column()
    parcels: number

    @Column({name: 'parcel_value', type: 'float'})
    parcelValue: number
    
    @Column()
    deadline: Date

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date

    @ManyToOne(() => CategoryExpense, category => category.expenses, {nullable: false})
    @JoinColumn({name: 'id_category', referencedColumnName: 'id'})
    category: CategoryExpense

    @ManyToOne(() => User, user => user.expenses, {nullable: false})
    @JoinColumn({name: 'id_user', referencedColumnName: 'id'})
    user: User

    @ManyToOne(() => PaymentType, PaymentType => PaymentType.expenses, {nullable: false})
    @JoinColumn({name: 'id_payment', referencedColumnName: 'id'})
    paymentType: PaymentType
}