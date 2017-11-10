import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('p/scale-value', 'helper:p/scale-value', {
  integration: true,
})

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234')

  this.render(hbs`{{p/scale-value inputValue}}`)

  assert.equal(
    this.$()
      .text()
      .trim(),
    '1234',
  )
})
