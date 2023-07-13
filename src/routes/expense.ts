import { expenseController } from '@/application/controllers/Expense'
import { authenticate } from '@/application/middlewares/authenticate'
import {Router} from 'express'

const router = Router()

router.get('/', authenticate, expenseController.get)
router.get('/:id', authenticate, expenseController.show)
router.post('/', authenticate, expenseController.insert)
router.put('/:id', authenticate, expenseController.update)
router.delete('/:id', authenticate, expenseController.delete)

export const routerExpense = router