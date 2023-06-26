import { revenueController } from '@/application/controllers/Revenue'
import {Router} from 'express'

const router = Router()

router.get('/', revenueController.get)
router.get('/:id', revenueController.show)
router.post('/', revenueController.insert)

export const routerRevenue = router