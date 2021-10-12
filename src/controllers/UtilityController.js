import express from 'express';
import logger from '../lib/logger';
import { version } from '../../package.json';

const router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: 'Ping Successfull' });
});

router.get('/status', function (req, res) {
  res.json({ status: 'online' });
});

router.get('/info', function (req, res) {
  res.json({ status: 'online', version });
});

// localhost:3000/utility/exception
router.get('/exception', function (req, res) {
  try {
    throw new Error('A planned Exception has occurred');
    // res.json({ status: 'you should not get here', version });
  } catch (error) {
    logger.error(error.message);
    return res.status(500).json({ status: 500, message: error.message });
  }
});

export default router;
