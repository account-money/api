
export type CardType = {
    id: string
    name?: string
}

export interface IGetCardType {
    get: () => Promise<CardType[]>
}
