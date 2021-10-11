import express from 'express';
import logger from '../lib/logger';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  logger.info('Logit! Users');

  res.send('respond with a resource');
});

// export default router;
module.exports = router;
