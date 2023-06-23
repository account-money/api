import { PaymentTypeUsecase, paymentTypeUsecase } from "@/domain/usecases/PaymentType";
import { Request, Response } from "express";
import {z} from 'zod'
import { validateFields } from "../validation/field";
import { BadRequest, ServerError } from "../errors/http";


class PaymentTypeController {
    constructor(private readonly paymentTypeUsecase: PaymentTypeUsecase){}

    get = async(req: Request, res: Response): Promise<void> => {
        try {
            const paymentType = await this.paymentTypeUsecase.get();
            res.json(paymentType)
        }catch(e: any | unknown){
            if (e instanceof BadRequest) res.status(e.status).json({error: {name: e.message, messages: e.errors}})
            else res.status(500).json({error: {name: new ServerError().message}})
        }
    }
}

export const paymentTypeController = new PaymentTypeController(paymentTypeUsecase)