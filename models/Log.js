(function() {
  var mongoose = require('mongoose');
  // TODO(Anurag): Components Array to be an input to which ever application is using this package.
  // var componentsArray = ['app', 'example', 'example2'];

  /*
    Additional Enhancements:
      1. Mail when high level errors come up;
      2. Auto purge old logs, or Low error logs;
      3. Error levels are [0, 1, 2, 3] [NoError, LowError, MediumError, HighError]. Instead make developer decide what level he wants to set it to
  */
  var LogSchema = new mongoose.Schema({
    name: { // could be name of process flow
      type: String,
      required: true,
      // unique: true,
      default: 'General'
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now
    },
    messages: [{
      messageString: {
        type: String,
        required: 'true'
      },
      error: {
        type: Number,
        enum: [0, 1, 2, 3]
      },
      // component: {
      //   type: String,
      //   enum: componentsArray,
      //   default: 'app'
      // },
      timestamp: {
        type: Date,
        required: true,
        default: Date.now
      }
    }],
    error: {
      no: {
        type: Number,
        required: true,
        default: 0
      },
      high: {
        type: Number,
        required: true,
        default: 0
      },
      medium: {
        type: Number,
        required: true,
        default: 0
      },
      low: {
        type: Number,
        required: true,
        default: 0
      }
    }
  });

  LogSchema.methods.log = function(messageString, callback) {
    // DOCS(Anurag): Message for console
    console.log(this.name + ': ' + messageString);
    // var message = {
    //   messageString: messageString,
    //   error: 0
    // };
    //
    // this.messages.push(message);
    // this.error.no++;
    // console.log('******SAVING******');
    // this.save((error) => {
    //   if (!error) {
    //     // console.log(this.name + ': ' + messageString);
    //     if (!!callback) callback(null);
    //   } else {
    //     // console.error('there was an error in storing this message: ', error);
    //     if (!!callback) callback(error);
    //   }
    // });
    this.model(this.constructor.modelName).findByIdAndUpdate(
      this._id,
      {
        $push: {
          messages: {
            messageString: messageString,
            error: 0
          }
        }
      },
      {
        new: true
      },
      function (error, updatedDoc) {
        if (!error) {
          // console.log(this.name + ': ' + messageString);
          if (!!callback) callback(null);
        } else {
          console.error('there was an error in storing this message: ', error);
          if (!!callback) callback(error);
        }
      });
  };

  LogSchema.methods.errorLow = function(messageString, callback) {
    console.error(this.name + ': ' + messageString + ' | ERROR LEVEL 1');
    // var message = {
    //   messageString: messageString,
    //   error: 1
    // };
    //
    // this.messages.push(message);
    // this.error.low++;
    //
    // console.log('******SAVING******');
    // this.save((error) => {
    //   if (!error) {
    //     // console.error(this.name + ': ' + messageString + ' | ERROR LEVEL 1');
    //     if (!!callback) callback(null);
    //   } else {
    //     console.error('there was an error in storing this message: ', error);
    //     if (!!callback) callback(error);
    //   }
    // });
    this.model(this.constructor.modelName).findByIdAndUpdate(
      this._id,
      {
        $push: {
          messages: {
            messageString: messageString,
            error: 1
          }
        }
      },
      {
        new: true
      },
      function (error, updatedDoc) {
        if (!error) {
          // console.error(this.name + ': ' + messageString + ' | ERROR LEVEL 1');
          if (!!callback) callback(null);
        } else {
          console.error('there was an error in storing this message: ', error);
          if (!!callback) callback(error);
        }
      });
  };

  LogSchema.methods.errorMedium = function(messageString, callback) {
    console.error(this.name + ': ' + messageString + ' | ERROR LEVEL 2');
    // var message = {
    //   messageString: messageString,
    //   error: 2
    // };
    //
    // this.messages.push(message);
    // this.error.medium++;
    //
    // console.log('******SAVING******');
    // this.save((error) => {
    //   if (!error) {
    //     // console.error(this.name + ': ' + messageString + ' | ERROR LEVEL 2');
    //     console.log('******SAVED******');
    //     if (!!callback) callback(null);
    //   } else {
    //     console.error('there was an error in storing this message: ', error);
    //     if (!!callback) callback(error);
    //   }
    // });

    this.model(this.constructor.modelName).findByIdAndUpdate(
      this._id,
      {
        $push: {
          messages: {
            messageString: messageString,
            error: 2
          }
        }
      },
      {
        new: true
      },
      function (error, updatedDoc) {
        if (!error) {
          // console.error(this.name + ': ' + messageString + ' | ERROR LEVEL 2');
          if (!!callback) callback(null);
        } else {
          console.error('there was an error in storing this message: ', error);
          if (!!callback) callback(error);
        }
      });
  };

  LogSchema.methods.errorHigh = function(messageString, callback) {
    console.error(this.name + ': ' + messageString + ' | ERROR LEVEL 3');
    // var message = {
    //   messageString: messageString,
    //   error: 3
    // };
    //
    // this.messages.push(message);
    // this.error.high++;
    //
    // console.log('******SAVING******');
    // this.save((error) => {
    //   if (!error) {
    //     // console.error(this.name + ': ' + messageString + ' | ERROR LEVEL 3');
    //     if (!!callback) callback(null);
    //   } else {
    //     console.error('there was an error in storing this message: ', error);
    //     if (!!callback) callback(error);
    //   }
    // });
    this.model(this.constructor.modelName).findByIdAndUpdate(
      this._id,
      {
        $push: {
          messages: {
            messageString: messageString,
            error: 3
          }
        }
      },
      {
        new: true
      },
      function (error, updatedDoc) {
        if (!error) {
          // console.error(this.name + ': ' + messageString + ' | ERROR LEVEL 3');
          if (!!callback) callback(null);
        } else {
          console.error('there was an error in storing this message: ', error);
          if (!!callback) callback(error);
        }
      });
  };
  // console.log("SmartEncoder_Log");
  // codeReview(Anurag): Let the naming stay as Log for this collection
  var Log = mongoose.model('Log', LogSchema);
  module.exports = Log;
})();
