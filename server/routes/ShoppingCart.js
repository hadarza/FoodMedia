const router = require('express').Router();
const ProductController = require('../controllers/Product/ProductController')
//Send Message

router.get('/SetProductList',ProductController.ProductList)
module.exports = router;