# `ember-primer` Helpers

Most helpers exposed in this addon are prefixed with `p/`, for example: `p/sample`. 
This is to avoid name clashes with other addons and helpers you may already be using.

### `p/extent`

The extent helper is used for finding the min and max values of an array of sorted data
to be used as the input to the domain of a scale.

There are 3 ways to use this addon:

#### Extent of a flat array:

```js
let data = [1,2,3,4,5]
```

```hbs
{{p/extent data}}
// outputs [1,5]
```

#### Extent of an array of objects:

```js
let data = [{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2}]
```

```hbs
{{p/extent data key="x"}}
// outputs [1,5]
```

#### Extent of an array of pairs:

```js
let data = [[1,2],[2,2],[3,2],[4,2],[5,2]]
```

```hbs
{{p/extent data key="$0"}}
// outputs [1,5]
```

#### Example usage when constructing a scale:

```
{{p/scale-linear (p/extent values key="$0")}}
```

In this example, we're sending the extent of values for the `x` axis to the 
`scale-linear` helper.

### `p/accessor <path or index> [transformFn]`

Constructs an accessor function for fetching values from a collection.

```hbs
{{ xValues=(p/map (p/accessor "$1" (p/transform-date))) }}
```

An optional transform helper can be applied as the second argument which will be
applied to each returned value. See `p/transform-date`

### `p/map collection mapFn`

Maps values from a collection using the supplied map helper function.

```hbs
{{p/map timestamps (p/transform-date)}}
```

### `p/scale-value scale valueToScale`

Returns the scaled value from a given scale.

```hbs
{{ p/scale-value xScale 10 }}
```

## Transform Helpers

Transform helpers provide a simple way to convert values on the fly before passing 
them down to another component.

### `p/transform-date`

Returns a function which transforms unix timestamps to Date objects.

```hbs
{{(p/map timestamps (p/transform-date)}}
```
