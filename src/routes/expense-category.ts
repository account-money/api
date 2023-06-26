import { categoryExpenseController } from '@/application/controllers/CategoryExpense'
import {Router} from 'express'

const router = Router()

router.get('/:id', categoryExpenseController.show)
router.post('/', categoryExpenseController.insert)

export const routerCategoryExpense = router