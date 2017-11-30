(function () {
  "use strict";
  /* Load Node Modules */
  var router = require('express').Router(),
    mongoose = require('mongoose');

  /* Load Mongoose Models */
  var Log = mongoose.model('Log');

  /* Load Log Objects */
  var general = new Log(), // note you can put error callback here too to be safe
    userAuthentication = new Log({ name: 'User Authentication' });

  router.post('/general', function (req, res, next) {

    general.save();
    general.log('here i am bro2'); // can also use callback to make sure it was not errored
    general.log('here i am bro3');
    general.log('here i am bro4');
    general.log('here i am bro5');
    general.log('here i am bro6');

    general.errorLow('there was an error here bro!!');
    general.errorMedium('there was an medium error here bro');
    general.errorHigh('there was an high error here bro');

    res.json('helloworld general');
  });

  router.post('/user-authentication', function (req, res, next) {

    userAuthentication.save();
    userAuthentication.log('here i am bro2'); // can also use callback to make sure it was not errored
    userAuthentication.log('here i am bro3');
    userAuthentication.log('here i am bro4');
    userAuthentication.log('here i am bro5');
    userAuthentication.log('here i am bro6');

    userAuthentication.errorLow('there was an error here bro!!');
    userAuthentication.errorMedium('there was an medium error here bro');
    userAuthentication.errorHigh('there was an high error here bro');

    res.json('helloworld user-authentication');
  });

  module.exports = router;
})();
