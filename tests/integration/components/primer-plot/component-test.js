import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('primer-plot', 'Integration | Component | primer plot', {
  integration: true
});

test('it renders the SVG tag', function(assert) {
  this.render(hbs`
    {{#primer-plot as |primer|}}
    {{/primer-plot}}
  `);

  assert.equal(this.$('svg').length, 1, 'svg tag on page');
  assert.equal(this.$('svg').attr('width'), 640, 'svg has width');
  assert.equal(this.$('svg').attr('height'), 250, 'svg has height');
});

test('it disables auto size if width is specified', function(assert) {
  this.render(hbs`
    {{#primer-plot width=100 height=24 as |primer|}}
    {{/primer-plot}}
  `);

  assert.equal(this.$('svg').length, 1, 'svg tag on page');
  assert.equal(this.$('svg').attr('width'), 100, 'svg has width');
  assert.equal(this.$('svg').attr('height'), 24, 'svg has height');
});

test('it renders the container', function(assert) {
  this.set('actualRect', {});

  this.render(hbs`
    {{#primer-plot width=200 height=100 as |primer|}}
      {{#primer.container margin="16 24" as |primer rect|}}
        <text>{{rect.width}},{{rect.height}}</text>
      {{/primer.container}}
    {{/primer-plot}}
  `);

  assert.equal(this.$('svg text').text().trim(), '152,68', 'container has padding');
  assert.equal(this.$('svg g').attr('transform'), 'translate(24,16)', 'container is positioned');
});

