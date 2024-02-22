const Product = require('../models/Product');
const Cart = require('../models/Cart');

module.exports = {
    addCart: async (req, res) => {
        const userId = req.user.id;
        const { cartItem, quantity } = req.body;
        try {
            const cart = await Cart.findOne({ userId });
            if (cart) {
                const existingProduct = cart.products.find(
                    // we are just checking whether the product we are pushing to our cart item exists in our cart
                    (product) => product.cartItem.toString() === cartItem
                );
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.products.push({ cartItem, quantity: 1 });
                }
                await cart.save();
                res.status(200).json('Product added to the cart');
            } else {
                const newCart = new Cart({
                    userId,
                    products: [{ cartItem, quantity: 1 }]
                });
                await newCart.save();
                res.status(200).json('Product added to the cart');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getCart: async (req, res) => {
        const userId = req.user.id;
        try {
            const cart = await Cart.find({ userId }).populate('products.cartItem', '_id name imageUrl price Category');
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    deleteCartItem: async (req, res) => {
        const cartItemId = req.params.cartItem;
        try {
            const updatedCart = await Cart.findOneAndUpdate(
                { 'products._id': cartItemId }, // (products._id => neet to find product._id ) first we are going to find the product with same id that one we passed in our params
                { $pull: { products: { _id: cartItemId } } }, // pulling the item that from the products list and pulling _id and the id is our cartItemId
                { new: true }
            );
            if (!updatedCart) {
                return res.status(404).json({ message: 'Cart item not found' });
            }
            return res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}