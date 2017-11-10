import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import { find } from 'ember-native-dom-helpers'
import { scaleLinear } from 'd3-scale'

moduleForComponent('primer-area', 'Integration | Component | primer area', {
  integration: true,
})

test('it renders path data', function(assert) {
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
    {{primer-area values=values yScale=yScale xScale=xScale}}
  `)

  assert.equal(
    find('path').getAttribute('d'),
    'M1,100C1.3333333333333333,100,1.6666666666666667,100,2,100C2.3333333333333335,100,2.6666666666666665,100,3,100L3,6C2.6666666666666665,11,2.3333333333333335,16,2,16C1.6666666666666667,16,1.3333333333333333,13,1,10Z',
  )
})
