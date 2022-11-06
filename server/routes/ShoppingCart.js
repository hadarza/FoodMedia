const router = require('express').Router();
const CartController = require('../controllers/CartController')
const checkSession = require('../middleware/CheckSession');

router.get('/',checkSession,CartController.CartList)
router.put('/:id',checkSession,CartController.UpdateController)
router.delete('/:id',checkSession,CartController.DeleteItemController)
router.delete('/',checkSession,CartController.EmptyCartController)

module.exports = router;