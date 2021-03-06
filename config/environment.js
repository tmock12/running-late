/* jshint node: true */
var os     = require('os');
var ifaces = os.networkInterfaces();

var addresses = [];
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details){
    if(details.family === 'IPv4' && details.address !== '127.0.0.1') {
      addresses.push(details.address);
    }
  });
}

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'running-late',
    environment: environment,
    baseURL: '/',
    defaultLocationType: 'auto',
    slackWebhook: process.env.SLACK_WEBHOOK,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'frame-src': "gap://ready",
      'script-src': "'self'",
      'font-src': "'self'",
      'connect-src': "'self'",
      'img-src': "'self'",
      'style-src': "'self'",
      'media-src': "'self'"
    },
    cordova: {
      rebuildOnChange: false,
      emulate: false,
      emberUrl: 'http://' + addresses[0] + ':4200',
      liveReload: {
        enabled: true,
        platform: 'ios'
      }
    },
    framework7: {
      theme: 'ios'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.apiUrl   = 'http://' + addresses[0] + ':4000';
    ENV.development = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
