import { categoryExpenseController } from '@/application/controllers/CategoryExpense'
import { authenticate } from '@/application/middlewares/authenticate'
import {Router} from 'express'

const router = Router()

router.get('/', authenticate, categoryExpenseController.get)
router.get('/:id', authenticate, categoryExpenseController.show)
router.post('/', authenticate, categoryExpenseController.insert)
router.put('/:id', authenticate, categoryExpenseController.update)
router.delete('/:id', authenticate, categoryExpenseController.delete)

export const routerCategoryExpense = router