import { Product } from '../models/product.js'
import { CustomError } from '../utils/customError.js'

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({})
        if (!products) {
            return next(new CustomError('Products not found', 400))
        }
        res.status(200).json({ success: true, products })
    } catch (error) {
        return next(new CustomError(error, 500))
    }
}
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return next(new CustomError('Product not found', 400))
        }
        res.status(200).json({ success: true, product })
    } catch (error) {
        console.log('from product.js line 24')
        return next(new CustomError(error, 500))
    }
}


export { getProducts, getProductById }