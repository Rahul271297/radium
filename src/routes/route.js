const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")
const Middleware= require("../middlewares/middleware")
const UserController= require("../controllers/userController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/registerUser',  UserController.registerUser  );
router.post('/logIn',  UserController.logIn  );
router.get('/userdetails1/:userId',Middleware.validation, UserController.userdetails1)
router.put('/users/:userId',Middleware.validation, UserController.updateUser)
module.exports = router;
