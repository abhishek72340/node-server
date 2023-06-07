import mongoose from 'mongoose';
const ProductSchema = new mongoose.Schema(
    {
        desc: { type: String, required: "Product Description is required" },
        price: { type: String, required: "Product Price is required" },
        brand: { type: String, required: "Product Brand is required" },

        image: {
            type: String,
            required: 'Product Image is Required.',
        },
        images: [{
            view: { type: String, required: true },
            src: {
                type: String,
                required: "Src is required"
            }
        }],

        inStock: { type: Boolean, required: "Product In stock is required" },
        fastDelivery: {
            type: Boolean,
            required: "Product Fast delivery is required",
        },
        trending: {
            type: Boolean,
            required: "Product trending is required",
        },
        gender: {
            type: Boolean,
            required: "Product Gender is required",
        },
        category: { type: String, required: "Product category is required" },
        ratings: { type: Number, required: "Product Ratings is required" },
        ratingCount: { type: Number, required: "Product Rating count is required" },
        mrp: { type: Number, required: "Product MRP is required" },
        price: { type: Number, required: "Product price is required" },
        offer: { type: String, required: "Product Offer is required" },
        productId: { type: String, required: "Product ProductId is required" },
    },
);

const Product = mongoose.model("Product", ProductSchema);

export { Product }


