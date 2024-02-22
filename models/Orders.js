const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    customerId: { type: String, required: true }, // come from stripe
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    delivery_status: { type: String, required: true, default: 'pending' },
    payment_status: { type: String, required: true },
    total: { type: Number, required: true },
}, { timestamps: true });

// to export the model, 'Product' is the name of the model and is using ProductSchema
module.exports = mongoose.model('Order', OrderSchema);