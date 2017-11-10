# `@primer`

Ember Primer is a collection of data visualization primitives (components) which
can be composed together to construct ambitious data visualizations and interactive
presentations.

> **Ember Primer** is built and maintained by [Flood IO](https://flood.io?utm_source=github), an easy to use load testing platform for any scale of testing.

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

## Conventions

In cartesion based graphs, all data points are expressed in the order of `x,y`.
This means that if you have an array of pairs, the values should be `[[x,y], [x,y], ...]`.

Additionally, unless it is data, everything is named with axis prefix then name, for
example, `xAxis`, `xScale`, `yScale`. If you see `x`, or `y`, it should be assumed to
refer to an individual data point on that axis.

## Components

TBA

# Helpers

Most helpers exposed in this addon are prefixed with `p/`, for example: `p/sample`.
This is to avoid name clashes with other addons and helpers you may already be using.

[Helper Documentation](/docs/helpers.md)

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
