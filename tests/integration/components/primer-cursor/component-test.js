import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('primer-cursor', 'Integration | Component | primer cursor', {
  integration: true
  // needs: ['component:primer-plot']
});

function createTouchEvent(name, x, y /* , identifier*/) {
  return new MouseEvent(name, {
    view: window,
    bubbles: true,
    cancelable: true,
    button: 0,
    clientX: x,
    clientY: y,
    screenX: x,
    screenY: y
  });
}

test('it handles mouse events', function(assert) {
  this.render(hbs`
    {{#primer-plot as |primer|}}
      {{#primer.cursor as |x y|}}
        <g><text>{{x}},{{y}}</text></g>
      {{/primer.cursor}}
    {{/primer-plot}}
  `);

  let event = createTouchEvent('test', 51, 54);
  this.$('svg')[0].dispatchEvent(event);

  return wait().then(() => {
    assert.equal(this.$('g text').text().trim(), '51,54');
  });
});
