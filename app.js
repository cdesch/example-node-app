import 'core-js/stable';
import 'regenerator-runtime/runtime';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import promMid from 'express-prometheus-middleware';
import morganMiddleware from './lib/morganMiddleware';
import logger from './lib/logger';
import { API_HOST, API_PORT } from './lib/config';
import UtilityController from './controllers/UtilityController';

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

/**
 * Prometheus Metrics
 */
app.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/utility', UtilityController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(API_PORT, API_HOST, () => {
  logger.info(`listening on port ${API_HOST}:${API_PORT}`);
});
// module.exports = app;
