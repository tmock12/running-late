import Ember from 'ember';

export default Ember.Controller.extend({
  slackNamePresent: Ember.computed.notEmpty("slackName"),
  actions: {
    saveUserName: function() {
      if (!this.get("slackNamePresent")) { return; }
      var user = this.store.createRecord("user", {
        userName: this.get('slackName')
      });
      user.save().then(
        () => { this.transitionToRoute("running-late", user); }
      );
    },
  }

});
