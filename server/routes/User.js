const router = require('express').Router();
const UserController = require('../controllers/UserController')
const authorization = require('../middleware/authorization')

router.post('/Register',UserController.Register)
router.post('/Login',UserController.Login)
router.post('/verify',authorization,UserController.verify)

module.exports = router;
