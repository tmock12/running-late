import Ember from 'ember';

export default Ember.Controller.extend({
  userName: Ember.computed.alias("model.userName"),
  disableSend: false,

  alertSuccess: function() {
    this.get('f7').alert('Late notification has been sent', 'Success');
    this.set("disableSend", false);
  },
  alertFailure: function() {
    this.get('f7').alert('There was a problem sending the notification', 'Error');
    this.set("disableSend", false);
  },

  actions: {
    sendRunningLate: function() {
      this.set("disableSend", true);
      var runningLate = this.store.createRecord("running-late", {
        text: `${this.get("userName")} is running late`
      });
      runningLate.save().then(
        () => { this.alertSuccess(); },
        () => { this.alertFailure(); }
      );
    }
  }
});
