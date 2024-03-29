const jwt = require('jsonwebtoken');
const User = require('../models/User');

// whenever the token is correct, we need to proceed the next function
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        // Bearer abcdefghi
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
            if (err) res.status(403).json('Invalid token');
            req.user = user;
            next()
        });
    } else {
        return res.status(401).json('You are not authenticated');
    }
}

module.exports = { verifyToken };