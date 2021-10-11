var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const client = require('prom-client');
const promMid = require('express-prometheus-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// const register = new client.Registry();

// client.collectDefaultMetrics({
//     app: 'node-application-monitoring-app',
//     prefix: 'node_',
//     timeout: 10000,
//     gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
//     register
// });

app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],

}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.send(await register.metrics());
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const host = '0.0.0.0';
const port = 3000;
app.listen(port, host, () => {
  console.log(`listening on port ${host}:${port}`)
});
// module.exports = app;
