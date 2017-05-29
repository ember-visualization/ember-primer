import Ember from 'ember';
import ResizeableContainerMixin from 'ember-primer/mixins/resizeable-container';
import { module, test } from 'qunit';

module('Unit | Mixin | resizeable container');

// Replace this with your real tests.
test('it works', function(assert) {
  let ResizeableContainerObject = Ember.Object.extend(ResizeableContainerMixin);
  let subject = ResizeableContainerObject.create();
  assert.ok(subject);
});
