import { paymentTypeController } from '@/application/controllers/PaymentType'
import { authenticate } from '@/application/middlewares/authenticate'
import {Router} from 'express'

const router = Router()

router.get('/', authenticate, paymentTypeController.get)

export const routerPaymentType = router