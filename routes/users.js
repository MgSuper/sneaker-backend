const router = require('express').Router();
const userController = require('../controllers/usersController');
const { verifyToken } = require('../middleware/verifyToken');

// calling middleware to get the data, get the id and use the id in functions
// pass the middleware, check the data from the token and then pass it to functions 
router.get('/', verifyToken, userController.getUser);
router.delete('/', verifyToken, userController.delete);

// to hook it into our index.js
module.exports = router;

