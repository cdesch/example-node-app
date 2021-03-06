import 'core-js/stable';
import 'regenerator-runtime/runtime';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import promBundle from 'express-prom-bundle';
import { createLightship } from 'lightship';
import * as Sentry from '@sentry/node';

// Importing @sentry/tracing patches the global hub for tracing to work.
import * as Tracing from '@sentry/tracing';
import morganMiddleware from './lib/morganMiddleware';
import logger from './lib/logger';
import { API_HOST, API_PORT, SENTRY_DSN } from './lib/config';
import UtilityController from './controllers/UtilityController';

const metricsMiddleware = promBundle({ includeMethod: true });

Sentry.init({
  dsn: SENTRY_DSN,

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const configuration = {};

const lightship = createLightship(configuration);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

logger.info('Starting Example Node App');
logger.info(`API_HOST: ${API_HOST}`);
logger.info(`API_PORT: ${API_PORT}`);

app.use(metricsMiddleware);

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
  lightship.signalReady();
});
// module.exports = app;
