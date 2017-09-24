d3-jetpack is a set of nifty convenience wrappers that speed up your daily work with d3.js

[![jetpack](http://68.media.tumblr.com/tumblr_m4kkxd8nWB1rwkrdbo1_500.jpg)](http://myjetpack.tumblr.com/post/23725103159)

(comic by [Tom Gauld](http://myjetpack.tumblr.com/]))

## Usage

If you use NPM, `npm install d3-jetpack`. Otherwise, download the latest [d3v4+jetpack.js](https://raw.githubusercontent.com/gka/d3-jetpack/master/build/d3v4%2Bjetpack.js).

Here's what's in the package:

<a name="append" href="#append">#</a> selection.<b>append</b>(<i>selector</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/append.js "Source") 

Modifies `append` so it adds classes and ids. 

```js
selection.append("div.my-class");
selection.append("div.first-class.second-class");
selection.append("div#someId");
selection.append("div#someId.some-class");
```

<a name="insert" href="#insert">#</a> selection.<b>insert</b>(<i>selector</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/insert.js "Source")

Works with insert, too:

```js
selection.insert("div.my-class");
```


<a name="appendMany" href="#appendMany">#</a> selection.<b>appendMany</b>(<i>array</i>, <i>selector</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/appendMany.js "Source")

Instead of making an empty selection, binding data to it, taking the enter selection and appending elements as separate steps:

```js
selection.selectAll('div.my-class')
  .data(myArray)
  .enter()
  .append('div.my-class');
```

use `appendMany`:

```js
selection.appendMany(myArray, 'div.my-class');
```

<a name="at" href="#at">#</a> selection.<b>at</b>(<i>name[, value]</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/at.js "Source")

Works like d3v3's `.attr`. Passing an object to name sets multiple attributes, passing a string returns a single attribute and passing a string & second argument sets a single attribute.

To avoid having to use quotes around attributes and styles with hyphens when using the object notation, camelCase keys are hyphenated. Instead of:

```js
selection
    .attr('stroke-width', 10)
    .attr('text-anchor', 'end')
    .attr('font-weight', 600)
```

or with [d3-selection-multi](https://github.com/d3/d3-selection-multi): 

```js
selection.attrs({'stroke-width': 10, 'text-anchor': 'end', 'font-weight': 600})
```

you can write: 

```js
selection.at({fontSize: 10, textAnchor: 'end', fontWeight: 600})
```

With syntax highlighting on, it is a little easier to see the difference between keys and values when everything isn't a string. Plus there's less typing! 


<a name="st" href="#st">#</a> selection.<b>st</b>(<i>name[, value]</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/st.js "Source")

Like `at`, but for `style`. Additionally, when a number is passed to a style that requires a unit of measure, like `margin-top` or `font-size`, `px` is automatically appended. Instead of 

```js
selection
    .style('margin-top', height/2 + 'px')
    .style('font-size', '40px')
    .style('width', width - 80 + 'px')
```

The `+ px`s can also be dropped: 

```js
selection.st({marginTop: height/2, fontSize: 40, width: width - 80})
```

<a name="selectAppend" href="#selectAppend">#</a> d3.<b>selectAppend</b>(<i>selector</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/selectAppend.js "Source")

Selects the first element that matches the specified selector string or if no elements match the selector, it will append an element. This is often handy for elements which are required as part of the DOM hierachy, especially when making repeated calls to the same code. When appending it will also add id and classes, same as Jetpack's [append](#append)

```js
d3.selectAppend('ul.fruits')
    .selectAll('li')
    .data(data)
```

<a name="parent" href="#parent">#</a> d3.<b>parent</b>(<i></i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/parent.js "Source")

Returns the parent of each element in the selection: 

```js
d3.selectAll('span')
    .style('color', 'red')
  .parent()
    .style('background', 'yellow')
```

This might mess with the joined data and/or return duplicate elements. Usually better to save a variable, but sometimes useful when working with nested html.

<a name="translate" href="#translate">#</a> selection.<b>translate</b>(<i>xyPosition</i>, [<i>dim</i>]) [<>](https://github.com/gka/d3-jetpack/blob/master/src/translate.js "Source")

How I hated writing ``.attr('transform', function(d) { return 'translate()'; })`` a thousand times...

```js
svg.append('g').translate([margin.left, margin.top]);
circle.translate(function(d) { return  [x(d.date), y(d.value)]; });
```

If you only want to set a *single* dimension you can tell translate by passing 0 (for x) or 1 (for y) as second argument:

```js
x_ticks.translate(d3.f(x), 0);
y_ticks.translate(d3.f(y), 1);
```

HTML is supported as well! `translate` uses style transforms with px units if the first element in the selection is HTML.

```js
svg_selection.translate([40,20]); // will set attribute transform="translate(40, 20)"
html_selection.translate([40,20]); // will set style.transform = "translate(40px, 20px)"
```

<a name="tspans" href="#tspans">#</a> selection.<b>tspans</b>(<i>array</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/tspans.js "Source")

For multi-line SVG text

```js
selection.append('text')
    .tspans(function(d) {
        return d.text.split('\n');
    });
selection.append('text').tspans(['Multiple', 'lines'], 20);
```

The optional second argument sets the line height (defaults to 15).

<a name="wordwrap" href="#wordwrap">#</a> d3.<b>wordwrap</b>(<i>text</i>, [<i>lineWidth</i>]) [<>](https://github.com/gka/d3-jetpack/blob/master/src/wordwrap.js "Source")

Comes in handy with the tspans:

```js
selection.append('text')
    .tspans(function(d) {
        return d3.wordwrap(text, 15);  // break line after 15 characters
    });
```

<a name="f" href="#f">#</a> d3.<b>f</b>(<i>key</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/f.js "Source")

``d3.f`` takes a string|number and returns a function that takes an object and returns whatever property the string is named. This clears away much of verbose function(d){ return ... } syntax in ECMAScript 5:

```js
x.domain(d3.extent(items, function(d){ return d.price; }));
```

becomes

```js
x.domain(d3.extent(items, d3.f('price'));
```

d3.f even accepts multiple accessors and will execute them in the order of appearance. So for instance, let's say we have an array of polygon objects like this ``{ points: [{x: 0, y: 3}, ...] }`` we can get the first ``y`` coordinates using:

```js
var firstY = polygons.map(d3.f('points', 0, 'y'));
```

Since we use this little function quite a lot, we usually set `var ƒ = d3.f` (type with [alt] + f on Macs). Also, [in @1wheel's blog](http://roadtolarissa.com/blog/2014/06/23/even-fewer-lamdas-with-d3/) you can read more about the rationale behind ƒ.

<a name="ascendingKey" href="#ascendingKey">#</a> d3.<b>ascendingKey</b>(<i>key</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/ascendingKey.js "Source") 

<a name="descendingKey" href="#descendingKey">#</a> d3.<b>descendingKey</b>(<i>key</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/descendingKey.js "Source")

These functions operate like d3.ascending / d3.descending but you can pass a key string or key function which will be used to specify the property by which to sort an array of objects.

```js
var fruits = [{ name: "Apple", color: "green" }, { name: "Banana", color: "yellow" }];
fruits.sort(d3.ascendingKey('color'));
```

<a 
name="nestBy" href="#nestBy">#</a> d3.<b>nestBy</b>(<i>array, key</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/nestBy.js "Source")

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

<a 
name="loadData" href="#loadData">#</a> d3.<b>loadData</b>(<i>file1, file2, file3, ..., callback</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/loadData.js "Source")

Takes any number of files paths and loads them with `queue`, `d3.csv` and `d3.json`. After all the files have loaded, calls the `callback` function with the first error (or null if there are none) as the first argument and an array of the loaded files as the second. Instead of:

```js
d3.queue()
    .defer(d3.csv, 'state-data.csv')
    .defer(d3.tsv, 'county-data.tsv')
    .defer(d3.json, 'us.json')
    .awaitAll(function(err, res){
        var states = res[0],
            counties = res[1],
            us = res[2]
    })
```

if your file types match their extensions, you can use: 

```js
d3.loadData('state-data.csv', 'county-data.tsv', 'us.json', function(err, res){
    var states = res[0],
        counties = res[1],
        us = res[2]
})
```


<a name="round" href="#round">#</a> d3.<b>round</b>(<i>x</i>, <i>precisions</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/round.js "Source")

A useful short-hand method for `+d3.format('.'+precision+'f')(x)` also known as `+x.toFixed(precision)`. Note that this code is [fundamentally broken](https://twitter.com/mbostock/status/776448389814718465) but still works fine 99% of the time.

```js
d3.round(1.2345, 2) // 1.23
```


<a name="clamp" href="#clamp">#</a> d3.<b>clamp</b>(<i>min</i>, <i>val</i>, <i>max</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/clamp.js "Source")

Short for `Math.max(min, Math.min(max, val))`.

```js
d3.clamp(0, -10, 200) // 0
d3.clamp(0, 110, 200) // 110
d3.clamp(0, 410, 200) // 200
```


<a name="attachTooltip" href="#attachTooltip">#</a> d3.<b>attachTooltip</b>(<i>selector</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/attachTooltip.js "Source")

Attaches a light weight tooltip that prints out all of an objects properties on click. No more `> d3.select($0).datum()`! 

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

Make sure to add a  `<div class='tooltip'></div>` and that there's some tooltip css on the page:

```css
.tooltip {
  top: -1000px;
  position: fixed;
  padding: 10px;
  background: rgba(255, 255, 255, .90);
  border: 1px solid lightgray;
  pointer-events: none;
}
.tooltip-hidden{
  opacity: 0;
  transition: all .3s;
  transition-delay: .1s;
}

@media (max-width: 590px){
  div.tooltip{
    bottom: -1px;
    width: calc(100%);
    left: -1px !important;
    right: -1px !important;
    top: auto !important;
    width: auto !important;
  }
}
```

<a name="conventions" href="#conventions">#</a> d3.<b>conventions</b>(<i>[options]</i>) [<>](https://github.com/gka/d3-jetpack/blob/master/src/conventions.js "Source")

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





