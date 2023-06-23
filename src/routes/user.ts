import { userController } from '@/application/controllers/User'
import {Router} from 'express'

const router = Router()

router.post('/', userController.insert)

export const routerUser = router