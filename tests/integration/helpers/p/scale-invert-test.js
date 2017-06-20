
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('p/scale-invert', 'helper:p/scale-invert', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{p/scale-invert inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

