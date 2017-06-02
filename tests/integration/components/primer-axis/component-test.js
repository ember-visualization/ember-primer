import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';
import { scaleLinear } from 'd3-scale';

moduleForComponent('primer-axis', 'Integration | Component | primer axis', {
  integration: true
});

test('it renders', function(assert) {
  this.set('values', [
    [1, 10],
    [2, 16],
    [3, 6]
  ]);
  this.set('rect', {
    top: 0,
    right: 100,
    left: 0,
    bottom: 100,
    width: 100,
    height: 100
  });
  this.set('xScale', scaleLinear().domain([1, 3]).rangeRound([0, 100]));
  this.set('yScale', scaleLinear().domain([6, 16]).rangeRound([100, 0]));

  this.render(hbs`{{primer-axis scale=yScale rect=rect}}`);

  assert.equal(find('g').getAttribute('transform'), 'translate(0,100)', 'it is positioned at the bottom of the chart');
});
