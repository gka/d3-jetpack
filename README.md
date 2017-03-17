d3-jetpack is a set of nifty convenience wrappers that speed up your daily work with d3.js

[![jetpack](https://68.media.tumblr.com/tumblr_m4kkxd8nWB1rwkrdbo1_500.jpg)](http://myjetpack.tumblr.com/post/23725103159)

(comic by [Tom Gauld](http://myjetpack.tumblr.com/]))

## Usage

If you use NPM, `npm install d3-jetpack`. Otherwise, download the latest [d3v4+jetpack.js](https://raw.githubusercontent.com/1wheel/d3-jetpack-module/master/build/d3v4%2Bjetpack.js).

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

#### d3.round(x, precision)

A useful short-hand method for `+d3.format('.'+precision+'f')(x)` also known as `+x.toFixed(precision)`. Note that this code is [fundamentally broken](https://twitter.com/mbostock/status/776448389814718465) but still works fine 99% of the time.

```js
d3.round(1.2345, 2) // 1.23
```

<a name="at" href="#at">#</a> selection.<b>at</b>(<i>name[, value]</i>) [<>](https://github.com/1wheel/d3-jetpack-module/blob/master/src/at.js "Source")

Works like d3v3's `.attr`. Passing an object to name sets multiple attributes, passing a string returns a single attribute and passing a string & second argument sets a single attribute.

To avoid having to use quotes around attributes and styles with hyphens when using the object notation, camelCase keys are hyphenated. Instead of:

    selection
        .attr('stroke-width', 10)
        .attr('text-anchor', 'end')
        .attr('font-weight', 600)

or with [d3-selection-multi](https://github.com/d3/d3-selection-multi): 

    selection.attrs({'stroke-width': 10, 'text-anchor': 'end', 'font-weight': 600})

you can write: 

    selection.at({fontSize: 10, textAnchor: 'end', fontWeight: 600})

With syntax highlighting on, it is a little easier to see the difference between keys and values when everything isn't a string. Plus there's less typing! 


<a name="st" href="#st">#</a> selection.<b>st</b>(<i>name[, value]</i>) [<>](https://github.com/1wheel/d3-jetpack-module/blob/master/src/st.js "Source")

Like `at`, but for `style`. Additionally, when a number is passed to a style that requires a unit of measure, like `margin-top` or `font-size`, `px` is automatically appended. Instead of 

    selection
        .style('margin-top', height/2 + 'px')
        .style('font-size', '40px')
        .style('width', width - 80 + 'px')

The `+ px`s can also be dropped: 

    selection.st({marginTop: height/2, fontSize: 40, width: width - 80})

<a 
name="loadData" href="#loadData">#</a> d3.<b>loadData</b>(<i>files, callback</i>) [<>](https://github.com/1wheel/d3-jetpack-module/blob/master/src/loadData.js "Source")

Takes an array of files paths and loads them with `queue`, `d3.csv` and `d3.json`. After all the files have loaded, calls the `callback` function with the first error (or null if none) as the first arguement and an array of the loaded files as the secound. Instead of:

```js
d3.queue()
    .defer(d3.csv, 'state-data.csv')
    .defer(d3.csv, 'county-data.csv')
    .defer(d3.json, 'us.json')
    .awaitAll(function(err, res){
        var states = res[0],
            counties = res[1],
            us = res[2]
    })
```

if your file types match their extensions, you can use: 

```js
d3.loadData(['state-data.csv', 'county-data.csv', 'us.json'], function(err, res){
    var states = res[0],
        counties = res[1],
        us = res[2]
})
```

<a 
name="nestBy" href="#nestBy">#</a> d3.<b>nestBy</b>(<i>array, key</i>) [<>](https://github.com/1wheel/d3-jetpack-module/blob/master/src/nestBy.js "Source")

Shorthand for `d3.nest().key(key).entries(array)`. Returns an array of arrays, instead of a `key`/`value` pairs. The `key` property of each array is equal the value returned by the `key` function when it is called with element of the array.  

```js
d3.nest()
    .key(ƒ('year'))
    .entries(yields)
    .forEach(function(d){
        console.log('Count in ' + d.key + ': ' + d.values.length) })
```

to 

```js
d3.nestBy(yields, ƒ('year')).forEach(function(d){
    console.log('Count in ' + d.key  + ': ' + d.length) })
```

<a name="selectAppend" href="#selectAppend">#</a> d3.<b>selectAppend</b>(<i>selector</i>) [<>](https://github.com/1wheel/d3-jetpack-module/blob/master/src/selectAppend.js "Source")

Selects the first element that matches the specified selector string or if no elements match the selector, it will append an element. This is often handy for elements which are required as part of the DOM hierachy, especially when making repeated calls to the same code. When appending it will also add id and classes, same as Jetpack's [append](#append)

```js
d3.selectAppend('ul.fruits')
    .selectAll('li')
    .data(data)
```


#### d3.attachTooltip

Attaches a light weight tooltip that prints out all of an objects properties on click. No more `> d3.select($0).datum()`! Make sure to add a  `<div class='tooltip'></div>` and that the tooltip css exist on the page - see [index](https://github.com/1wheel/d3-starterkit/blob/master/index.html) for an example.

```js
d3.select('body').selectAppend('div.tooltip')

circles.call(d3.attachTooltip)
```

For formated tooltips, update the html of the tooltip on mouseover:

```js
circles
    .call(d3.attachTooltip)
    .on('mouseover', function(d){
      d3.select('.tooltip').html("Number of " + d.key + ": " + d.length) })
```

#### d3.conventions
`d3.conventions()` appends an `svg` element with a `g` element according to the  [margin convention](http://bl.ocks.org/mbostock/3019563) to the page and returns an object with the following properties:

`totalWidth`, `totalHeight`, `margin`: size of the `svg` and its margins

`width`, `height`: size of `svg` inside of margins. 

`parentSel`: `d3.selection` of the element the `svg` was appended to. Defaults to `d3.select("body")`, but like every other returned value, can be specified by passing in an object: `d3.conventions({parentSel: d3.select("#graph-container"), totalHeight: 1300})` appends an svg to `#graph-container` with a height of 1300.

`svg`: `g` element translated to make room for the margins

`x`: Linear scale with a range of `[0, width]`

`y`: Linear scale with a range of `[height, 0]`

`xAxis`: Axis with scale set to x and orient to "bottom"

`yAxis`: Axis with scale set to y and orient to "left"

`drawAxis`: Call to append axis group elements to the svg after configuring the domain. Not configurable.





