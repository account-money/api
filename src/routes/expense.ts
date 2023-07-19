import { expenseController } from '@/application/controllers/Expense'
import { authenticate } from '@/application/middlewares/authenticate'
import {Router} from 'express'

const router = Router()

router.get('/', expenseController.get)
router.get('/:id', authenticate, expenseController.show)
router.post('/', authenticate, expenseController.insert)
router.post('/paid/:id', authenticate, expenseController.paid)
router.put('/:id', authenticate, expenseController.update)
router.delete('/:id', authenticate, expenseController.delete)

export const routerExpense = router