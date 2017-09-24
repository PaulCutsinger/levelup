'use strict';
var Alexa = require("alexa-sdk");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.dynamoDBTableName = 'levelup'; // That's it!
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
  // This will short-cut any incoming intent or launch requests and route them to this handler.
    'NewSession': function() {
       console.log("in newSession");
       if(Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
          this.attributes['currentLevel'] = 0;
          this.attributes['gameScore'] = 0;
        }

        //loadGameLevel.call(this);

        if (this.event.request.type === 'IntentRequest') {
            this.emit(this.event.request.intent.name);
        } else {
          this.emit('LaunchRequest');
        }
    },
    'LaunchRequest': function () {
        console.log("in LaunchRequest");
        var currentLevel = this.attributes['currentLevel'];
        this.response.speak('Welcome you are on level ' + currentLevel);
        this.emit(':responseReady');
    },
    'playLevel': function () {
        console.log("in playLevel");
        var previousLevel = this.attributes['currentLevel']
        this.attributes['currentLevel']+=1;
        var currentLevel = this.attributes['currentLevel'];
        this.response.speak('congratulations you advanced from ' + previousLevel + ' to '+currentLevel);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};

function loadGameLevel() {

};
