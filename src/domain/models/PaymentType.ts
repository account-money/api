
export type PaymentType = {
    id: number
    name?: string
}

export interface IGetPaymentType {
    get: () => Promise<PaymentType[]>
}
