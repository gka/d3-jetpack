d3-jetpack is a set of nifty convenience wrappers that speed up your daily work with d3.js

[![jetpack](http://36.media.tumblr.com/tumblr_m4kkxd8nWB1rwkrdbo1_500.jpg)](http://myjetpack.tumblr.com/post/23725103159)
  (comic by [Tom Gauld](http://myjetpack.tumblr.com/]))

## Usage

You can use d3-jetpack with AMD, CommonJS and browser globals. 
You need to install d3 in order to use d3-jetpack.

### AMD 
```js
var d3 = require('./d3-jetpack'); 
// now d3 has a jetpack
```

### CommonJS 
```js
requirejs(['d3-jetpack'],function (d3) {
  // now d3 has a jetpack
})
```

### Browser globals 
```markup
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.12/d3.js"></script>
<script src="js/d3-jetpack.js"></script>
<script>
  // now d3 has a jetpack
</script>
```

Here's what's in the package:

#### selection.append / selection.insert

Appending and inserting with classes/ids 

```js
selection.append("div.my-class");
selection.append("div.first-class.second-class");
selection.append("div#someId");
selection.append("div#someId.some-class");

// works with insert, too
selection.insert("div.my-class");
```

#### selection.appendMany

combines data().enter().append()

```js
selection.appendMany(myArray, 'div.my-class');
// is same as
selection.selectAll('div.my-class')
  .data(myArray)
  .enter()
  .append('div.my-class');
```

#### selection.tspans

For multi-line SVG text

```js
selection.append('text').tspans(['Multiple', 'lines']);
selection.append('text')
    .tspans(function(d) {
        return d.text.split('\n');
    });
```

#### selection.on

jetpack lets you set the same listener for multiple events at once, jQuery style.

```js
selection.on('click touchend', function() {
    console.log('this works on desktop AND mobile!');
});
```

#### d3.wordwrap

Comes in handy with the tspans..

```js
selection.append('text')
    .tspans(function(d) {
        return d3.wordwrap(text, 15);  // break line after 15 characters
    });
```

#### selection.translate

How I hated writing ``.attr('transform', function(d) { return 'translate()'; })`` a thousand times...

```js
svg.append('g').translate([margin.left, margin.top]);
tick.translate(function(d) { return  [0, y(d)]; });
```

#### selection.prop

jetpack added `selection.prop` as alias for `selection.property`. Much faster to type, isn't it? Also only consistent with `selection.attr`, and familiar to [jQuery](http://api.jquery.com/prop/) folks.

#### ƒ or d3.f

``ƒ`` takes a string|number and returns a function that takes an object and returns whatever property the string is named. This clears away much of verbose function(d){ return ... } syntax in ECMAScript 5:

```js
x.domain(d3.extent(items, function(d){ return d.price; }));
```

becomes

```js
x.domain(d3.extent(items, ƒ('price'));
```

ƒ even accepts multiple accessors and will execute them in the order of appearance. So for instance, let's say we have an array of polygon objects like this ``{ points: [{x: 0, y: 3}, ...] }`` we can get the first ``y`` coordinates using:

```js
var firstY = polygons.map(ƒ('points', 0, 'y'));
```

If you don't know how to type ƒ (it's [alt] + f on Macs), you can use ``d3.f()``, too. Also, [in @1wheel's blog](http://roadtolarissa.com/blog/2014/06/23/even-fewer-lamdas-with-d3/) you can read more about the rationale behind ƒ.

#### Special operator `ƒ.call`

Let's say we have an array of objects which expose certain properties via accessor functions, like `polygon.centroid()`. Calling just `ƒ('centroid')` would return the accessor function itself instead of the result. To get ƒ to call the accessor function we added a special operator `ƒ.call`. 

```js
var centroids = polygons.map(ƒ('centroid', 'ƒ.call'));
```

#### Special operator `ƒ.not`

This one is helpful if you're accessing boolean values but for some reason want to negate them.

```js
selection.classed('hidden', ƒ('is_visible', 'ƒ.not'));
```

#### d3.ascendingKey and d3.descendingKey

These functions operate like d3.ascending / d3.descending but you can pass a key string or key function which will be used to specify the property by which to sort an array of objects.

```js
var fruits = [{ name: "Apple", color: "green" }, { name: "Banana", color: "yellow" }];
fruits.sort(d3.ascendingKey('color'));
```
