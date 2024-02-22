const Orders = require('../models/Orders');

module.exports = {
    getUserOrders: async (req, res) => {
        // capture the userID from our middleware
        const userID = req.user.id;
        try {
            // store all the orders from our database
            const userOrders = await Orders.find({ userId })
                .populate({ // if we need to retrieve the data, we need to populate them first and send back the data with product data, we are not sending back only the userID
                    path: 'productId',
                    // we need to select the values that we need to send back with our user data, we are not going to send everything
                    select: '-sizes -oldPrice -description -category'
                }).exec(); // we populate the data first and then put it in our userOrders
            res.status(200).json(userOrders);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get orders' });
        }
    }
}