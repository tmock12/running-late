import DS from 'ember-data';
import Ember from 'ember';
import ENV from 'running-late/config/environment';

export default DS.Adapter.extend({
  createRecord: function(store, type, snapshot) {
    var data = snapshot.attributes();

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: "POST",
        url: ENV.slackWebhook,
        data: JSON.stringify(data),
        success: function() {
          Ember.run(null, resolve, data);
        },
        error: function(response) {
          Ember.run(null, reject, response);
        }
      });
    });
  }
});
