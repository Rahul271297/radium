const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")
const ProductModel=require("../models/productModel")
const OrderModel=require("../models/orderModel")
const UserController= require("../controllers/userController")
const ProductController= require("../controllers/productController")
const Middleware=require("../middleware/globalmiddleware")
const OrderController= require("../controllers/orderController")

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/createUser', Middleware.validation, UserController.createUser  );
router.get('/getAllUsers',  UserController.getUsersData  );
router.post('/createProduct', ProductController.createProduct  );
router.post('/createOrder',Middleware.validation, OrderController.createOrder);

module.exports = router;