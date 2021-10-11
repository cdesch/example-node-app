import express from 'express';
import { version } from '../package.json';

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

export default router;
