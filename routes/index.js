var express = require('express');
var router = express.Router();
var url = require('../models/url');
/* GET home page. */
router.get('/',async function(req, res, next) {
  try {
    var urls = await url.find();
    console.log(urls);
    res.render('index', {urls});
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

module.exports = router;
