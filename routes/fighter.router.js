var express = require('express');
var router = express.Router();
const fighterController = require('../controllers/fighter.controller');

router.post('/submit/:username', fighterController.submit);
router.post('/edit/:username', fighterController.edit);
router.delete('/:date/:username', fighterController.delete);

module.exports = router;
