import { CustomError } from '../utils/customError.js'

const getWishlistProducts = async (req, res) => {
    const { user } = req;
    const populatedUser = await user.populate('wishlist')
    res.json({ success: true, message: 'Successfully fetched', data: populatedUser.wishlist });
};

const addToWishlist = async (req, res) => {
    let { user } = req;
    const { productId } = req.body;
    user.wishlist.push(productId)
    try {
        await user.save()
        res.json({ success: true, message: "Product Added to wishlist", wishlist: user.wishlist })
    } catch (err) {
        res.json({ success: false, message: "Error in adding to wishlist" })
    }
}

const removeFromWishlist = async (req, res) => {
    let { user } = req;
    const { productId } = req.body;
    user.wishlist.pull(productId)
    try {
        await user.save()
        res.json({ success: true, message: "product removed from wishlist", wishlist: user.wishlist })
    } catch (err) {
        res.json({ success: false, message: "Error in removing from wishlist" })
    }
}

export { getWishlistProducts, addToWishlist, removeFromWishlist }



