import { loginController } from '@/application/controllers/Login'
import {Router} from 'express'

const router = Router()

router.post('/', loginController.execute)

export const routerLogin = router