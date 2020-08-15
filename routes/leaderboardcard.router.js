var express = require('express');
var router = express.Router();
const leadercontroller = require('../controllers/leaderboardcard.controller');

router.get('/allusers', leadercontroller.getAllCards);


module.exports = router;
