import { userController } from '@/application/controllers/User'
import {Router} from 'express'
import { authenticate } from '@/application/middlewares/authenticate'

const router = Router()

router.get('/:id', authenticate, userController.show)
router.post('/', userController.insert)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

export const routerUser = router