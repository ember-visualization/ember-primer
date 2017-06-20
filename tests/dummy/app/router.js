import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('examples', function() {
    this.route('cursor');
    this.route('margin');
    this.route('scatter');
    this.route('line');
    this.route('interactive-area');
  });
});

export default Router;
