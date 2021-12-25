const express = require('express');
const router = express.Router();


const AuthorController = require("../controllers/authorController.js")
//const Middleware = require("../middlewares/middleware.js")
const BlogController = require("../controllers/blogController.js")

const Middleware = require("../middlewares/middleware.js")





router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/createAuthor', AuthorController.createAuthor);
router.post('/createBook', BlogController.createBook);
router.get('/blogs',BlogController.listBlog)
router.put('/blogs/:blogId',Middleware.auth, BlogController.updateBlog)
router.post('/login',AuthorController.login )
router.delete('/blogs/:blogId',Middleware.auth, BlogController.deletedData)
router.delete('/blogs',Middleware.auth, BlogController.deleteDataByQuery)
module.exports = router;