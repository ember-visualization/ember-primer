import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('primer-label', 'Integration | Component | primer label', {
  integration: true
});

test('it renders text parts', function(assert) {
  this.render(hbs`{{primer-label text="Label 1\n$12.00"}}`);
  assert.equal(this.$('tspan').length, 2);
  assert.equal(this.$('tspan:first-child').text().trim(), 'Label 1');
  assert.equal(this.$('tspan:nth-of-type(2)').text().trim(), '$12.00');
});

test('it renders block contents if gievn', function(assert) {
  this.render(hbs`{{#primer-label}}
    Test Label
  {{/primer-label}}`);
  assert.equal(this.$('tspan').length, 1);
  assert.equal(this.$().text().trim(), 'Test Label');
});

test('it renders title and desc', function(assert) {
  this.render(hbs`{{primer-label text="Label 1\n$12.00" title="Item Price" desc="Label showing item price"}}`);
  assert.equal(this.$('text title').length, 1, 'has title tag');
  assert.equal(this.$('text title').text().trim(), 'Item Price', 'shows title');
  assert.equal(this.$('text desc').text().trim(), 'Label showing item price', 'shows desc');
});

test('it renders transform', function(assert) {
  this.render(hbs`{{primer-label angle=90 x=24 y=16}}`);
  assert.equal(this.$('text').attr('transform'), 'rotate(90,24,16)', 'correctly computed transform attr');
});

