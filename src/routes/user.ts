import { userController } from '@/application/controllers/User'
import {Router} from 'express'

const router = Router()

router.get('/:id', userController.show)
router.post('/', userController.insert)

export const routerUser = router