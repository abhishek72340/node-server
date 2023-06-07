import express from 'express';
const router = express.Router()

import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import { getCartProducts, addToCart, removeFromCart, getUserFromId, updateProductQuantity } from '../controllers/cart.js';

router.use(isLoggedIn, getUserFromId);
router
    .route('/')
    .get(getCartProducts)
    .post(addToCart)
    .put(updateProductQuantity)
    .delete(removeFromCart);

export default router