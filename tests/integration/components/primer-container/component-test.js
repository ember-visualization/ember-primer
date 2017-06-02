import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find } from 'ember-native-dom-helpers';

moduleForComponent('primer-container', 'Integration | Component | primer container', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#primer-container margin="16" as |primer|}}
    {{/primer-container}}
  `);

  assert.equal(find('g').getAttribute('transform'), 'translate(16,16)', 'it positions itself from plot');
});
