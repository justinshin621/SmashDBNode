var express = require('express');
var router = express.Router();
const fighterController = require('../controllers/fighter.controller');

router.post('/submit/:userid', fighterController.submit);

module.exports = router;
