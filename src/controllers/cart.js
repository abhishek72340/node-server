import { User } from '../models/user.js';
import { CustomError } from '../utils/customError.js'
import extend from 'lodash/extend.js';


const getUserFromId = async (req, res, next) => {
    const { _id } = req.user;
    try {
        const currentUser = await User.findOne({ _id });

        if (!currentUser) {
            return res.json({ success: false, message: 'User not found' });
        }
        req.user = currentUser;
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }

    next();
};

const updateCart = async (req, res, next) => {
    const cart = await Cart.findOne({ _id: req.params.id })
    console.log(cart);
    if (!cart) {
        return next(new CustomError('product not found', 400))
    }
    const updatedCart = await Cart.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true, runValidators: true })

    res.status(200).json({ success: true, Cart: updatedCart })
}

const getCartProducts = async (req, res) => {
    const { user } = req;
    const populatedUser = await user.populate('cart.product')
    res.json({ success: true, message: 'Successfully fetched', data: populatedUser.cart });
};

const addToCart = async (req, res) => {
    let { user } = req;
    const { productId } = req.body;
    const updatedUser = user.cart.push({ quantity: 1, product: productId });
    user = extend(user, updatedUser);
    try {
        await user.save();
        res.json({ success: true, message: 'Product added to cart', data: user.cart });
    } catch (err) {
        console.log('Error while adding to cart :', err);
        res.json({ success: false, message: 'Error while Adding to Cart' });
    }
};

const removeFromCart = async (req, res) => {
    const { user } = req;
    const { productId } = req.body;
    const product = user.cart.find(({ product }) => product == productId);
    try {
        await user.cart.pull(product)
        await user.save()
        res.json({ success: true, message: 'Successfully Deleted', data: user.cart });
    } catch (error) {
        console.log('Deletion unsuccessful');
        res.json({ success: false, message: error.message });
    }
};

const updateProductQuantity = async (req, res) => {
    const { user } = req;
    const { productId, action } = req.body;

    const product = user.cart.find(({ product }) => product.toString() === productId);

    if (action === 'INCREMENT') product.quantity += 1;
    else product.quantity -= 1;
    try {
        await user.save();
        res.json({ success: true, data: user.cart });
    } catch (err) {
        res.json({ success: false, message: 'Error while Updating' });
    }
};
export { getCartProducts, addToCart, removeFromCart, updateProductQuantity, updateCart, getUserFromId }



