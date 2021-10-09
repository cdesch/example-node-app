var express = require('express');
var router = express.Router();
const logger = require('../logger');
const { version } = require('../package.json');
/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info("Logit! Index");
  res.render('index', { title: 'Express', version: version });
});

module.exports = router;
