const express = require('express')
const router = express.Router()

const userController = require('../controller/userController.js')
const addCart = require('../controller/addCart.js')
const authenticate = require('../middleware/auth.js')
const {placeOrder, threeWork} = require('../controller/orderController.js')
const {sellProduct,  buyProduct} = require('../controller/productController.js')


router.post('/register',  userController.registration )
router.post('/login',    userController.logIn )
router.post('/addCart',    authenticate, addCart.Cart)
router.post('/ordertocart/:userId/:productId', authenticate, placeOrder )
router.get('/orderTo/:userId', authenticate,threeWork )
router.get('/sell',  sellProduct )
router.get('/buy',  buyProduct)

module.exports = router;



