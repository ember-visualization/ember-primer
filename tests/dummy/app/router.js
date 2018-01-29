import config from './config/environment'
import EmberRouter from '@ember/routing/router'

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
})

Router.map(function() {
  this.route('examples', function() {
    this.route('cursor')
    this.route('margin')
    this.route('scatter')
    this.route('line')
    this.route('interactive-area')

    this.route('primitives', function() {
      this.route('candle');
    });
  })
})

export default Router
