var twilio = require('twilio'),
    cloudConfig = require('cloud/cloudConfig');

//Initialize the Twilio cloud module
twilio.initialize(cloudConfig.accountSid, cloudConfig.authToken);

//Define a cloud function to send an SMS
Parse.Cloud.define('sendLink', function(request, response) {
    //format phone number
    var n = request.params.phoneNumber.replace(/[^\d.]/g, '');
    if (request.params.phoneNumber.indexOf('+') === 0) {
        n = '+'+n;
    }

    twilio.sendSMS({
        From: cloudConfig.from, //a twilio number you control
        To: n,
        Body: request.params.textMessage
    }, {
        success: function(httpResponse) {
            console.log(httpResponse);
            response.success('Link is on the way to your phone!');
        },
        error: function(httpResponse) {
            console.error(httpResponse);
            response.error('There was a problem sending the link - please check your phone number and try again.');
        }
    });
});

Parse.Cloud.define("receiveSMS", function(request, response) {
  console.log("Received a new text: " + request.params.From);
  
    //format phone number
    var tonumber = '+16302000584';

    twilio.sendSMS({
        From: cloudConfig.from, //a twilio number you control
        To: tonumber,
        Body: request.params.Body
    }, {
        success: function(httpResponse) {
            console.log(httpResponse);
            response.success('receiveSMS success');
        },
        error: function(httpResponse) {
            console.error(httpResponse);
            response.error('receiveSMS error');
        }
    });
});