# Primer data format

All series charts are designed to handle multiple series at once, and because
there exists very few rational situations where you would want to display multiple
series against multiple disparate axis, we've settled on a data format which is compact
and easy to understand.

```js
let series = [[X1, Y1, Y2, ..., Yn], [X2, Y1, Y2, ..., Yn], ...]
```

In the simplest form, you'll have an array of tuples representing the X and Y values
for each data point to be plotted. In a more complex example, you'll have multiple
Y values to be represented by separate lines or areas.

When interacting with a chart using the `cursor-container`, each interaction will
return the closest data point to the mouse pointer, represented in this format, such
that the closest value will be first in the list, and the remaining values will
be in their original order _(PRs accepted to improve this)_.

## Exacting values

This format is easy to extract all X or Y values.

Example:

```js
let data = [[1,1,2,3,4],[1,1,2,3,4],[1,1,2,3,4],[1,1,2,3,4]];

let xValues = data.map(([x]) => x);
// => [1,1,1,1]
let yValues = data.map(([,...y]) => y);
// => [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]
```

We also provide view helpers for exacting values using the `p/accessor` helper.

```hbs
{{log (p/map data (p/accessor "$1"))}}
<!-- [1,1,1,1] -->
```

## Converting objects to the primer data format

We recommend doing the data conversion inside your route of controller, and
not inside the chart component itself, as this will increase chart reusability.


```js
...
async model() {
  let data = await fetch("/api/data-source");
  return data.map((obj) => {
    let {timestamp, value} = obj;
    return [timestamp, value];
  });
}
...
```

`NOTE:` Avoid using Ember Data for loading time series data as it will perform very poorly
due to converting each object in the series to a `DS.Model`.
