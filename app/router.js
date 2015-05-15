import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route("running-late", { path: "running-late/:user_id"});
  this.route("sign-in");
});
