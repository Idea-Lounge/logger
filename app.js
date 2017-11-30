(function () {
  "use strict";
  /* Packages */
  var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config');
  /* Packages */

  /* Mongoose */
  // codeReview(Anurag): Components array to be stored by application and passed to Log
  require('./models/Log');

  var dbString = "mongodb://" +
    config.database.username + ':' +
    config.database.password + '@' +
    config.database.url + ":" +
    config.database.port + "/" +
    config.database.name;

  mongoose.connect(dbString, function(error) {
    if (!error) {
      console.log('local mongodb connected');
    } else {
      console.log(dbString + ' mongodb not connected ' + error);
    }
  });
  /* Mongoose */

  /* Load Route Files */
  var index = require('./routes/index'),
    example = require('./routes/example');

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  /* Register Routes in Express */
  app.use('/', index);
  app.use('/example', example);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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

  module.exports = app;
})();
