var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/allusers',userController.getAllUsers);
router.post('/changeMain/:hasMain', userController.changeMain);


module.exports = router;
