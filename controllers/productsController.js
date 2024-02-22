const Product = require('../models/Product');

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        console.log('newProduct ', newProduct);
        try {
            await newProduct.save();
            res.status(200).json('Product created');
        } catch (error) {
            res.status(500).json('Failed to create product');
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json('Failed to get products');
        }
    },
    getProduct: async (req, res) => {
        const productId = req.params.id;
        try {
            const product = await Product.findById(productId);
            // excluded some properties that we don't want to send back to the user 
            // we don't want to createdAt
            const { __v, createdAt, ...productData } = product._doc;
            res.status(200).json(productData);
        } catch (error) {
            res.status(500).json('Failed to get products');
        }
    },
    searchProducts: async (req, res) => {
        try {
            const results = await Product.aggregate(
                [
                    {
                        $search: {
                            index: "coffeez",
                            text: {
                                query: req.params.key,
                                path: {
                                    wildcard: "*"
                                }
                            }
                        }
                    }
                ]
            );
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json('Failed to get products');
        }
    }
}
