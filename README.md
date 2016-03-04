d3-jetpack is a set of nifty convenience wrappers that speed up your daily work with d3.js

[![jetpack](http://36.media.tumblr.com/tumblr_m4kkxd8nWB1rwkrdbo1_500.jpg)](http://myjetpack.tumblr.com/post/23725103159)
  (comic by [Tom Gauld](http://myjetpack.tumblr.com/]))

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
svg.append(g).translate([margin.left, margin.top]);
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

#### d3.mergeObjects

Deep merge any numbers of objects.

```js
var merged = d3.mergeObjects({a: 1, b: {c: 8}}, {a: new Date(), b: {c: d3.f()}, d: 0}, {f: 9});
```

#### selection.appendHTML

Parse and append an HTML or SVG string.

```js
d3.select('.container').appendHTML('<svg><g><rect /></g></svg>');
```
Unlike using .html, .appendHTML can append multiple elements
```js
d3.select('.container').html('<span id="a"></span>');
d3.select('.container').html('<span id="b"></span>'); // will replace content
d3.select('.container').appendHTML('<span id="c"></span>'); // will append content

```
And it can be used with the enter/update/exit pattern
```js
d3.select('.container').selectAll('div.test')
    .data([0, 1, 2])
  .enter().appendHTML('<div class="test"><p></p></div>')
    .select('p')
    .text(function(d){ return d; });
```
