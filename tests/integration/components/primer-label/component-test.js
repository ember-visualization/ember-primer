import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, findWithAssert } from 'ember-native-dom-helpers';

moduleForComponent('primer-label', 'Integration | Component | primer label', {
  integration: true
});

test('it renders text parts', function(assert) {
  this.render(hbs`{{primer-label text="Label 1\n$12.00"}}`);
  assert.ok(findWithAssert('tspan'));
  assert.equal(find('tspan:first-child').textContent.trim(), 'Label 1');
  assert.equal(find('tspan:nth-of-type(2)').textContent.trim(), '$12.00');
});

test('it renders block contents if given', function(assert) {
  this.render(hbs`{{#primer-label}}
    Test Label
  {{/primer-label}}`);
  assert.ok(findWithAssert('tspan'));
  assert.equal(find('text').textContent.trim(), 'Test Label');
});

test('it renders title and desc', function(assert) {
  this.render(hbs`{{primer-label text="Label 1\n$12.00" title="Item Price" desc="Label showing item price"}}`);
  assert.ok(findWithAssert('text title'), 'has title tag');
  assert.equal(find('text title').textContent.trim(), 'Item Price', 'shows title');
  assert.equal(find('text desc').textContent.trim(), 'Label showing item price', 'shows desc');
});

test('it renders transform', function(assert) {
  this.render(hbs`{{primer-label angle=90 x=24 y=16}}`);
  assert.equal(find('text').getAttribute('transform'), 'rotate(90,24,16)', 'correctly computed transform attr');
});

