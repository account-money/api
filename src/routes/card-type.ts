import { cardTypeController } from '@/application/controllers/CardType'
import {Router} from 'express'

const router = Router()

router.get('/', cardTypeController.get)

export const routerCardType = router