import Component from '@ember/component'
import computed from 'ember-computed'
import run from 'ember-runloop'
import layout from './template'

import { brushX } from 'd3-brush'
import { axisBottom } from 'd3-axis'
import { select, event } from 'd3-selection'

function roundToSeconds(ms) {
  return Math.floor(ms / 1e3) * 1e3
}

function isEmptySelection(selection) {
  return !selection || selection[0] - selection[1] === 0
}

function extentFromSelection(selection, scale) {
  let isEmpty = isEmptySelection(selection)
  let extent
  if (isEmpty) {
    extent = scale.domain().map(date => date.getTime())
  } else {
    extent = selection.map(scale.invert).map(roundToSeconds)
  }

  return extent
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
    return Math.floor(this.get('rect.width') / 100)
  }),

  drawBrush() {
    let xScale = this.get('xScale')
    let rect = this.get('rect')

    // let xAxis = axisBottom()
    //   .scale(xScale)
    //   .tickSize(rect.height, 100)
    //   .ticks(Math.floor(rect.width / 100))
    // .tickFormat(d => formatAxisTimestamp(d, x1))

    // axis
    //   .selectAll('.tick text')
    //   .style('text-anchor', 'start')
    //   .style('dominant-baseline', 'middle')
    //   .attr('x', 6)
    //   .attr('y', rect.height / 2 - 6)

    // debugger
    let brush = brushX()
      .extent([[0, 0], [rect.width, rect.height]])
      .handleSize(this.get('handleSize'))
      .on('end', () => {
        let { selection, sourceEvent } = event
        let brushExtent = extentFromSelection(selection, xScale)

        run.next(this, () => {
          this.sendAction('_change', brushExtent, !selection)
        })
      })

    select(this.element)
      .call(brush)
      .attr('class', 'brush')

    // if (isSubSelection(newSelection.map(xScale), xScale.range())) {
    //   this.brush.move(brushElement, newSelection.map(xScale))
    // } else if (isFullSelection(newSelection, xScale)) {
    //   this.brush.move(brushElement, null)
    // }
  },
})
