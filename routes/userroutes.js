var express = require('express');
var router = express.Router();
const path = require('path');
const {authenticate}=require('../middlewares/authenticate')
const {userRegister,userLogin,alluser,deleteuser} = require('../controller/userApiController');
/* GET users listing. */
router.post('/register', userRegister);
router.post('/login',userLogin);
router.get('/all',authenticate,alluser);
router.delete('/:Id',authenticate,deleteuser);


module.exports = router;
