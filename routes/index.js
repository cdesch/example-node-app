import express from 'express';
import { version } from '../package.json';
import logger from '../lib/logger';

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  logger.info('Logit! Index');
  res.render('index', { title: 'Express', version });
});

module.exports = router;
