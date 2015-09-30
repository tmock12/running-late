import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr(),
  latitude: DS.attr(),
  longitude: DS.attr(),
  url: DS.attr()
});
