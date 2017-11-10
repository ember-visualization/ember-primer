import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('primer-transition', 'Integration | Component | primer transition', {
  integration: true,
})

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{primer-transition}}`)

  assert.equal(
    this.$()
      .text()
      .trim(),
    '',
  )

  // Template block usage:
  this.render(hbs`
    {{#primer-transition}}
      template block text
    {{/primer-transition}}
  `)

  assert.equal(
    this.$()
      .text()
      .trim(),
    'template block text',
  )
})
