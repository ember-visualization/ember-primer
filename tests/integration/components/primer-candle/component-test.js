import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('primer-candle', 'Integration | Component | primer candle', {
  integration: true,
})

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{primer-candle}}`)

  assert.equal(
    this.$()
      .text()
      .trim(),
    '',
  )

  // Template block usage:
  this.render(hbs`
    {{#primer-candle}}
      template block text
    {{/primer-candle}}
  `)

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text',
  )
})
