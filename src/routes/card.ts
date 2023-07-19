import { cardController } from '@/application/controllers/Card'
import { authenticate } from '@/application/middlewares/authenticate'
import {Router} from 'express'

const router = Router()

router.get('/', authenticate, cardController.get)
router.get('/:id', authenticate, cardController.show)
router.get('/invoice/:id', authenticate, cardController.invoice)
router.post('/paid/:id', authenticate, cardController.paid)
router.post('/', authenticate, cardController.insert)
router.put('/:id', authenticate, cardController.update)
router.delete('/:id', authenticate, cardController.delete)

export const routerCard = router