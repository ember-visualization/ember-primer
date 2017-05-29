# ember-primer

Ember Primer is a collection of data visualization primitives (components) which
can be composed together to construct ambitious data visualizations and interactive
presentations.

#### Primer has 3 design goals:

1. Primer is built on D3 (using `ember-d3` with D3.js 4.x), it should enable 
developers to efficiently construct presentations without concerning 
themselves with `insert/update/merge` semantics of D3.js,
2. Presentation and data should be separate concerns, allowing for data processing
to be done at a higher level and passed down to the presentation layer,
3. Interaction and animation layers should be composed separately from the visual
primitives.

#### It it Production Ready™?

No, not yet.

#### Is it awesome?

Yes.

# Installation

Installation is simple, run:

```
ember install ember-primer
```

If installation fails, please ensure your project is using at least the minimum
requirements of:

- NodeJS `>= 6`
- npm `>= 3`
- Ember CLI `>= 2.10`
- Ember `>= 2.10`

# Usage

*The following is an implementation goal, and the status of these APIs is in flux.*

## 0. The `primer-plot` component

This component inserts an SVG tag and exposes the dimensions of the chart for
positioning scaling of data and controls.

Example usage:

```hbs
{{#primer-plot (auto-size margin="16 8" padding="10") as |primer|}}
  ...
{{/primer-plot}}

```

`primer-plot <dimensions>`

You can either supply fixed dimensions with a hash:

```hbs
primer-plot (hash width=640 height=320)
```

Or use the `auto-size` helper to calculate the dimensions based on the containing
element.

# Helpers

### `extent`

The extent helper is used for finding the min and max values of an array of data
to be used as the input to the domain of a scale.

There are 3 ways to use this addon:

#### Extent of a flat array:

```js
let data = [1,2,3,4,5]
```

```hbs
{{extent data}}
// outputs [1,5]
```

#### Extent of an array of objects:

```js
let data = [{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2}]
```

```hbs
{{extent data key="x"}}
// outputs [1,5]
```

#### Extent of an array of pairs:

```js
let data = [[1,2],[2,2],[3,2],[4,2],[5,2]]
```

```hbs
{{extent data key="$0"}}
// outputs [1,5]
```

#### Example usage when constructing a scale:

```
{{scale-linear (extent values key="$0")}}
```

In this example, we're sending the extent of values for the `x` axis to the 
`scale-linear` helper.

## Developing

* `git clone <repository-url>` this repository
* `cd ember-primer`
* `npm install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
