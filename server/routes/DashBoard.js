const router = require('express').Router();
const DashBoardController = require('../controllers/DashBoardController')
const authorization = require('../middleware/authorization')
const multer = require('multer');
const { Dashboard } = require('@mui/icons-material');

// Create multer object
const imageUpload = multer({
    storage: multer.diskStorage(
        {
            destination: function (req, file, cb) {
                cb(null, 'images/');
            },
            filename: function (req, file, cb) {
                cb(
                    null,
                    new Date().valueOf() + 
                    '_' +
                    file.originalname
                );
            }
        }
    ), 
  });
router.post('/',authorization,DashBoardController.getUser)
router.get('/image/:filename',DashBoardController.getImageCarosuel)
router.get('/allImages',DashBoardController.getAllImageCarosuel)
router.post('/image', imageUpload.single('image'),DashBoardController.postImageCarosuel)
router.post('/Restaurant',DashBoardController.getAllRestaurantsByTag)
router.post('/GetImage',DashBoardController.getImage)
router.post('/GetInfoRestaurant',DashBoardController.getInfoRestaurant)
router.post('/GetProductsByRestaruants',DashBoardController.getProductsByRestaruants)

module.exports = router;