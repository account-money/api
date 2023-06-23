
export type PaymentType = {
    id: string
    name?: string
}

export interface IGetPaymentType {
    get: () => Promise<PaymentType[]>
}
