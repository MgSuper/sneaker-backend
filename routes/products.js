const router = require('express').Router();
const productController = require('../controllers/productsController');

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProduct)
router.get('/search/:key', productController.searchProducts)
router.post('/', productController.createProduct)

// to come to our product router
module.exports = router;