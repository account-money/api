import { cardController } from '@/application/controllers/Card'
import {Router} from 'express'

const router = Router()

router.get('/:id', cardController.show)
router.post('/', cardController.insert)

export const routerCard = router