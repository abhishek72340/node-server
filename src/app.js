import express from 'express';
import { config } from "dotenv"
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import user from './routes/user.js'
import product from './routes/product.js'
import cart from './routes/cart.js'
import wishlist from './routes/wishlist.js'

config()
app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

// cookie middleware
app.use(cookieParser())

// router middleware
app.use('/api/v1', user)
app.use('/api/v1/cart', cart)
app.use('/api/v1/wishlist', wishlist)
app.use('/api/v1/products', product)

export default app