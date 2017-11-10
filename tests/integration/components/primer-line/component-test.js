import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import { find } from 'ember-native-dom-helpers'
import { scaleLinear } from 'd3-scale'

moduleForComponent('primer-line', 'Integration | Component | primer line', {
  integration: true,
})

test('it renders', function(assert) {
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

  this.render(hbs`{{primer-line values=values}}`)

  assert.equal(
    find('path').getAttribute('d'),
    'M1,10C1.3333333333333333,13,1.6666666666666667,16,2,16C2.3333333333333335,16,2.6666666666666665,11,3,6',
  )
})
