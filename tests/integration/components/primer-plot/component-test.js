import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  find,
  findWithAssert,
  click,
  triggerEvent
} from 'ember-native-dom-helpers';

moduleForComponent('primer-plot', 'Integration | Component | primer plot', {
  integration: true
});

test('it renders the SVG tag', function(assert) {
  const done = assert.async();

  this.render(hbs`
    <div style="width: 100px; height: 100px; display: block; position:relative; transform:scale(1);">
      {{#primer-plot as |primer|}}
      {{/primer-plot}}
    </div>
  `);

  assert.ok(findWithAssert('svg'), 'svg tag on page');
  assert.equal(find('svg').getAttribute('role'), 'img', 'svg role');
  assert.equal(find('svg').getAttribute('aria-labelledby'), 'title desc', 'svg aria-labelledby');
  assert.equal(find('svg').getAttribute('width'), '640', 'svg has width');
  assert.equal(find('svg').getAttribute('height'), '250', 'svg has height');

  // setTimeout(() => done(), 20000);

});

test('it disables auto size if width is specified', function(assert) {
  this.render(hbs`
    {{#primer-plot width=100 height=24 as |primer|}}
    {{/primer-plot}}
  `);

  assert.equal(find('svg').getAttribute('width'), '100', 'svg has width');
  assert.equal(find('svg').getAttribute('height'), '24', 'svg has height');
});

test('it renders the container', async function(assert) {
  await this.render(hbs`
    <div style="width: 100px; height: 100px; display: block; position:relative;">
      {{#primer-plot as |primer|}}
        {{#primer.container margin="10" padding="0" as |primer rect|}}
          <text>{{rect.width}},{{rect.height}}</text>
        {{/primer.container}}
      {{/primer-plot}}
    </div>
  `);

  let text = await find('text').textContent;

  assert.equal(await find('svg').getAttribute('width'), '100', 'svg has width');
  assert.equal(await find('svg').getAttribute('height'), '100', 'svg has height');

  assert.equal(find('svg text').textContent.trim(), '152,68', 'container has padding');
  assert.equal(find('svg g').getAttribute('transform'), 'translate(24,16)', 'container is positioned');
});

