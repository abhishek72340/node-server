import express from 'express';
const router = express.Router()

import { register, login, logout, getCurrentUser } from '../controllers/user.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/getCurrentUser').get(isLoggedIn, getCurrentUser);

export default router
