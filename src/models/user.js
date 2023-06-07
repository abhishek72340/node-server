import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const { Schema } = mongoose;

const userSchema = Schema({
    fullName: {
        type: String,
        required: [true, "Please provide a full name"],
        maxlength: [20, "First Name should be under 20 char."]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validator: [validator.isEmail, 'Please enter email in correct format'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password should be at least 6 char."],
        select: false
    },
    cart: [
        {
            quantity: Number,
            product: { type: Schema.Types.ObjectId, ref: 'Product' },
        },
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],


}, { timestamps: true })

// encrypt password before save - HOOKS
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();

        this.password = await bcrypt.hash(this.password, 10)
    } catch (error) {

    }
})

// validate the password with passed on user password
userSchema.methods.isValidatedPassword = async function (usersendPassword) {
    return await bcrypt.compare(usersendPassword, this.password)
}

// create and return jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}


const User = mongoose.model('User', userSchema)

export { User }


