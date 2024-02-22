const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, default: 'Yangon, Hlaing' },
}, { timestamps: true });

// to export the model, 'Product' is the name of the model and is using ProductSchema
module.exports = mongoose.model('Users', UsersSchema);