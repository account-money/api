import { cardTypeController } from '@/application/controllers/CardType'
import { authenticate } from '@/application/middlewares/authenticate'
import {Router} from 'express'

const router = Router()

router.get('/', authenticate, cardTypeController.get)

export const routerCardType = router