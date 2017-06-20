import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('primer/basic-container', 'Integration | Component | primer/basic container', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{primer/basic-container}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#primer/basic-container}}
      template block text
    {{/primer/basic-container}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
