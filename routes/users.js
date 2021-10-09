var express = require('express');
var router = express.Router();
const logger = require('../logger');

/* GET users listing. */
router.get('/', function(req, res, next) {
  logger.info("Logit! Users");

  res.send('respond with a resource');
});

module.exports = router;
