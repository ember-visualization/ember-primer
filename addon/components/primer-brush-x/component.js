import Component from '@ember/component'
import computed from 'ember-computed'
import run from 'ember-runloop'
import layout from './template'

import { brushX } from 'd3-brush'
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
    let { xScale, rect, handleSize, selection } = this.getProperties(
      'xScale',
      'rect',
      'handleSize',
      'selection',
    )

    let brush = brushX()
      .extent([[0, 0], [rect.width, handleSize]])
      .handleSize(handleSize)
      .on('end', () => {
        let { selection: eventSelection } = event
        let extent = eventSelection.map(xScale.invert, xScale)
        run.next(this, () => {
          this.sendAction('_change', extent, !eventSelection)
        })
      })

    let moveSelection = selection.length ? selection.map(xScale) : null

    select(this.element)
      .call(brush)
      .attr('class', 'brush')
      .call(brush.move, moveSelection)
  },
})
