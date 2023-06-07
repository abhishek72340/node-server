import express from 'express';
const router = express.Router()

import { isLoggedIn } from '../middlewares/isLoggedIn.js'
import { addToWishlist, getWishlistProducts, removeFromWishlist } from '../controllers/wishlist.js';
import { getUserFromId } from '../controllers/cart.js';

router.use(isLoggedIn, getUserFromId);

router.route('/').get(getWishlistProducts).post(addToWishlist).delete(removeFromWishlist);

export default router