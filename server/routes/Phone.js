const router = require('express').Router();
const MessageController = require('../controllers/MessageController')
//Send Message

router.post('/Message',MessageController.SendMessage)
router.post('/Verify',MessageController.VerifyCode)
module.exports = router;