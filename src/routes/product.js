import express from 'express';
const router = express.Router()

import { getProducts, getProductById } from '../controllers/product.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

router.route('/').get(getProducts)
router.route('/:id').get(isLoggedIn, getProductById)
export default router