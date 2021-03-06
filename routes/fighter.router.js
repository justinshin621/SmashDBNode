var express = require('express');
var router = express.Router();
const fighterController = require('../controllers/fighter.controller');

router.post('/submit/:username', fighterController.submit)
router.get('/get', fighterController.getFighters);
router.post('/edit/:username', fighterController.edit);
router.delete('/:date/:username', fighterController.deleteFighter);

module.exports = router;
