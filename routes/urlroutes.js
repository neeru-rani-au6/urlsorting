const express = require('express');
const router = express.Router();
const path = require('path');
const {authenticate}=require('../middlewares/authenticate');
const urlController = require(path.join(__dirname,'../','controller/urlcontroller'));

router.get('/',authenticate, urlController.geturl);
router.post('/',authenticate, urlController.fullurl);
router.get('/:shortUrl', urlController.shorturl);


module.exports = router;