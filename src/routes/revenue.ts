import { revenueController } from '@/application/controllers/Revenue'
import { authenticate } from '@/application/middlewares/authenticate'
import {Router} from 'express'

const router = Router()

router.get('/', authenticate, revenueController.get)
router.get('/:id', authenticate, revenueController.show)
router.post('/', authenticate, revenueController.insert)
router.put('/:id', authenticate, revenueController.update)
router.delete('/:id', authenticate, revenueController.delete)

export const routerRevenue = router