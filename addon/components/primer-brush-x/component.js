import Component from '@ember/component'
import computed from 'ember-computed'
import run from 'ember-runloop'
import layout from './template'

import { brushX } from 'd3-brush'
import { axisBottom } from 'd3-axis'
import { select, event } from 'd3-selection'

const brushed = () => {
  debugger
}

export default Component.extend({
  layout,
  tagName: 'g',
  classNames: ['Primer-Brush-X'],

  height: 10,

  didReceiveAttrs() {
    run.scheduleOnce('render', this, this.drawBrush)
  },

  ticks: computed('rect.width', function() {
    return Math.floor(this.get('rect.width') / 10)
  }),

  drawBrush() {
    let xScale = this.get('xScale')
    let rect = this.get('rect')

    // let [x1] = xScale.domain()
    // let xAxis = axisBottom()
    //   .scale(xScale)
    //   .tickSize(rect.height, 100)
    //   .ticks(Math.floor(rect.width / 100))
    // // .tickFormat(d => formatAxisTimestamp(d, x1))

    // let axis = select(this.element)
    //   .append('g')
    //   .attr('class', 'axis axis--x')
    //   .call(xAxis)

    // axis
    //   .selectAll('.tick text')
    //   .style('text-anchor', 'start')
    //   .style('dominant-baseline', 'middle')
    //   .attr('x', 6)
    //   .attr('y', rect.height / 2 - 6)

    // debugger
    // let brush = brushX()
    //   .extent([[0, 0], [rect.width, rect.height]])
    //   .on('brush end', brushed)

    // select(this.element)
    //   .call(xAxis)
    //   .call(brush)
    // .attr('class', 'brush')
  },
})
