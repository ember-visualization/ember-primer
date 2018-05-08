import Component from '@ember/component'
import computed from 'ember-computed'
import run from 'ember-runloop'
import layout from './template'

import { brushX, brushSelection } from 'd3-brush'
import { axisBottom } from 'd3-axis'
import { select, event } from 'd3-selection'

export default Component.extend({
  layout,
  tagName: 'g',
  classNames: ['Primer-Brush-X'],

  height: 10,

  didReceiveAttrs() {
    run.scheduleOnce('render', this, this.drawBrush)
  },

  tickFormat: null,

  ticks: computed('rect.width', function() {
    return this.get('ticks') || Math.floor(this.get('rect.width') / 100)
  }),

  drawBrush() {
    console.log('drawing')

    let { xScale, rect, handleSize, selection } = this.getProperties(
      'xScale',
      'rect',
      'handleSize',
      'selection',
    )

    let brushElement = select(this.element)
    let mappedSelection = selection ? selection.map(xScale) : null

    let brush = brushX()
      .extent([[0, 0], [rect.width, handleSize]])
      .handleSize(handleSize)
    // .on('end', () => {

    // if (selection[0] !== extent[0] || selection[1] !== extent[1]) {
    // }
    // console.log(selection, extent)
    // debugger
    // })

    brushElement
      .call(brush)
      .call(brush.move, mappedSelection)
      .attr('class', 'brush')

    brush.on('end', () => {
      let { selection: eventSelection } = event
      let extent = eventSelection ? eventSelection.map(xScale.invert, xScale) : xScale.domain()
      run.next(this, () => {
        this.sendAction('_change', extent, !eventSelection)
      })
    })

    // let [rangeStart, rangeEnd] = xScale.range()

    // console.log(mappedSelection)

    // if (mappedSelection[0] !== rangeStart || mappedSelection[1] !== rangeEnd) {
    // }
  },
})
