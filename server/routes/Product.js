const router = require('express').Router();
const ProductController = require('../controllers/ProductController')
const checkSession = require('../middleware/CheckSession');

router.get('/',checkSession,ProductController.ProductList)
router.get('/reset',ProductController.ResetProductController)

module.exports = router;