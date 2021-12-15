const express = require('express');

const urlController = require('../controllers/urlController')

const router = express.Router();

router.post('/url/shorten', urlController.createUrl)
//router.get('/:code', urlController.getUrl)
router.get('/:code', urlController.getUrl) 
//router.get('/getOtp', urlController.getOtp)

module.exports = router;
