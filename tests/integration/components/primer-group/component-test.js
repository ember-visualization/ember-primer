import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('primer-group', 'Integration | Component | primer group', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#primer-group}}
      template block text
    {{/primer-group}}
  `);

  assert.equal(find('g').textContent.trim(), 'template block text');
});
