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


#### selection.appendData

Instead of making an empty selection, binding a data, taking the enter selection and appending elements as seperate steps:

```js
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')    
```

Use `appendData`:


```js
svg.appendData('circle', data)
```