import { paymentTypeController } from '@/application/controllers/PaymentType'
import {Router} from 'express'

const router = Router()

router.get('/', paymentTypeController.get)

export const routerPaymentType = router