import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find("user");
  },

  afterModel: function(model) {
    if (model.get("firstObject")) {
      this.transitionTo("running-late", model.get("firstObject"));
    }
    else {
      this.transitionTo("sign-in");
    }
  }
});
