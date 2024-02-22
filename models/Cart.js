const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            cartItem: {
                // cartItem is going to be of moongose schema referring to product model
                type: mongoose.Schema.Types.ObjectId,
                // 
                ref: 'Product'
            },
            quantity: { type: Number, default: 1 },
        }
    ]
}, { timestamps: true });

// to export the model, 'Product' is the name of the model and is using ProductSchema
module.exports = mongoose.model('Cart', CartSchema);