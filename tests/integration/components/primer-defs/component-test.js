import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('primer-defs', 'Integration | Component | primer defs', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`
    {{#primer-defs chartId="emeber123" as |chartId|}}
      <filter id="drop-shadow-{{chartId}}" height="200%" width="200%">
      </filter>
    {{/primer-defs}}
  `);

  assert.equal(this.$('defs filter').attr('id'), 'drop-shadow-emeber123', 'renders with chart id');
});
