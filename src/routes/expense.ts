import { expenseController } from '@/application/controllers/Expense'
import {Router} from 'express'

const router = Router()

router.get('/', expenseController.get)
router.get('/:id', expenseController.show)
router.post('/', expenseController.insert)

export const routerExpense = router