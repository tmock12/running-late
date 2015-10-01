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

  getLocation() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      var onSuccess = (position) => {
        this.set("lat", position.coords.latitude );
        this.set("long", position.coords.longitude );
        Ember.run(null, resolve);
      };
      var onError = (error) => {
        Ember.run(null, reject, error);
      };
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });
  },

  saveRunningLate() {
    var notification = this.store.createRecord("notification", {
      message: `${this.get("userName")} is running late`,
      latitude: this.get("lat"),
      longitude: this.get("long")
    });
    this.set("notification", notification);
    notification.save().then(
      () => { this.alertSuccess(); },
      () => { this.alertFailure(); }
    );
  },

  actions: {
    sendRunningLate: function() {
      this.set("disableSend", true);
      var saveRunningLate = () => { this.saveRunningLate(); };
      var failure = () => { this.alertFailure(); };

      this.getLocation().then(saveRunningLate, failure);
    },

    openNotificationUrl() {
      window.open(this.get('notification.url'), '_blank', 'location=yes');
    }
  }
});
