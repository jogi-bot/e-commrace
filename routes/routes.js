const express = require('express')
const router = express.Router()

const userController = require('../controller/userController.js')
const addCart = require('../controller/addCart.js')
const authenticate = require('../middleware/auth.js')


router.post('/register',  userController.registration )
router.post('/login',    userController.logIn )
router.post('/addCart',    authenticate, addCart.Cart)


module.exports = router;



