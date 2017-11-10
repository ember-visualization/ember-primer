import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import { find, click, triggerEvent } from 'ember-native-dom-helpers'
import { scaleLinear } from 'd3-scale'

moduleForComponent('primer-cursor', 'Integration | Component | primer cursor', {
  integration: true,
  // needs: ['component:primer-plot']
})

test('it handles mouse events', async function(assert) {
  this.set('values', [[1, 10], [2, 16], [3, 6]])

  this.set(
    'xScale',
    scaleLinear()
      .domain([1, 3])
      .rangeRound([0, 100]),
  )
  this.set(
    'yScale',
    scaleLinear()
      .domain([6, 16])
      .rangeRound([100, 0]),
  )

  this.render(hbs`
    {{#primer-plot as |primer|}}
      {{#primer.container xScale yScale as |primer|}}
        {{#primer.cursor as |x y|}}
          <g><text>{{x}},{{y}}</text></g>
        {{/primer.cursor}}
      {{/primer.container}}
    {{/primer-plot}}
  `)

  await click('svg g')

  await triggerEvent('svg', 'mousemove', {
    view: window,
    bubbles: true,
    cancelable: true,
    button: 0,
    clientX: 51,
    clientY: 54,
    screenX: 51,
    screenY: 54,
  })

  // NOTE: These values don't really mean anything right now and will change as
  // we refactor the way this works.
  assert.equal(await find('text').textContent.trim(), '-319,624')
})
