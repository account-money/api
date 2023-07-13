
export type CardType = {
    id: number
    name?: string
}

export interface IGetCardType {
    get: () => Promise<CardType[]>
}
