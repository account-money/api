import { CardTypeUsecase, cardTypeUsecase } from "@/domain/usecases/CardType";
import { Request, Response } from "express";
import {z} from 'zod'
import { validateFields } from "../validation/field";
import { BadRequest, ServerError } from "../errors/http";


class CardTypeController {
    constructor(private readonly cardTypeUsecase: CardTypeUsecase){}

    get = async(req: Request, res: Response): Promise<void> => {
        try {
            const cardType = await this.cardTypeUsecase.get();
            res.json(cardType)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
}

export const cardTypeController = new CardTypeController(cardTypeUsecase)