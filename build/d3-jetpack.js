// https://github.com/gka/d3-jetpack#readme Version 2.0.8. Copyright 2017 Gregor Aisch.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection'), require('d3-transition'), require('d3-array'), require('d3-axis'), require('d3-scale'), require('d3-collection'), require('d3-queue'), require('d3-request')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-selection', 'd3-transition', 'd3-array', 'd3-axis', 'd3-scale', 'd3-collection', 'd3-queue', 'd3-request'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3,global.d3));
}(this, (function (exports,d3Selection,d3Transition,d3Array,d3Axis,d3Scale,d3Collection,d3Queue,d3Request) { 'use strict';

var translateSelection = function(xy, dim) {
  return this.node().getBBox ?
    this.attr('transform', function(d,i) {
      var p = typeof xy == 'function' ? xy.call(this, d,i) : xy;
      if (dim === 0) p = [p, 0]; else if (dim === 1) p = [0, p];
      return 'translate(' + p[0] +','+ p[1]+')';
    }) :
    this.style('transform', function(d,i) {
      var p = typeof xy == 'function' ? xy.call(this, d,i) : xy;
      if (dim === 0) p = [p, 0]; else if (dim === 1) p = [0, p];
      return 'translate(' + p[0] +'px,'+ p[1]+'px)';
    });
};

var parseAttributes = function(name) {
  if (typeof name === "string") {
    var attr = {},
      parts = name.split(/([\.#])/g), p;
      name = parts.shift();
    while ((p = parts.shift())) {
      if (p == '.') attr['class'] = attr['class'] ? attr['class'] + ' ' + parts.shift() : parts.shift();
      else if (p == '#') attr.id = parts.shift();
    }
    return {tag: name, attr: attr};
  }
  return name;
};

var append = function(name) {
  var n = parseAttributes(name), s;
  name = d3Selection.creator(n.tag);
  s = this.select(function() {
    return this.appendChild(name.apply(this, arguments));
  });

  //attrs not provided by default in v4
  for (var key in n.attr) { s.attr(key, n.attr[key]); }
  return s;
};

function constantNull() {
  return null;
}

var insert = function(name, before) {
  var n = parseAttributes(name),
      create = d3Selection.creator(n.tag),
      select$$1 = before == null ? constantNull : typeof before === "function" ? before : d3Selection.selector(before);

  var s = this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select$$1.apply(this, arguments) || null);
  });


  //attrs not provided by default in v4
  for (var key in n.attr) { s.attr(key, n.attr[key]); }
  return s;
};

var parent = function() {
  var parents = [];
  return this.filter(function() {
    if (parents.indexOf(this.parentNode) > -1) return false;
    parents.push(this.parentNode);
    return true;
  }).select(function() {
    return this.parentNode;
  });
};

var selectAppend = function(name) {
  var select$$1 = d3Selection.selector(name),
     n = parseAttributes(name), s;

  name = d3Selection.creator(n.tag);

  s = this.select(function() {
    return select$$1.apply(this, arguments) ||
        this.appendChild(name.apply(this, arguments));
  });

  //attrs not provided by default in v4
  for (var key in n.attr) { s.attr(key, n.attr[key]); }
  return s;
};

var tspans = function(lines, lh) {
  return this.selectAll('tspan')
      .data(function(d) {
        return (typeof(lines) == 'function' ? lines(d) : lines)
          .map(function(l) {
            return { line: l, parent: d };
          });
      })
      .enter()
    .append('tspan')
      .text(function(d) { return d.line; })
      .attr('x', 0)
      .attr('dy', function(d, i) { return i ? (typeof(lh) == 'function' ? lh(d.parent, d.line, i) : lh) || 15 : 0; });
};

var appendMany = function(data, name){
  return this.selectAll(null).data(data).enter().append(name);
};

var at = function(name, value) {
  if (typeof(name) == 'object'){
    for (var key in name){
      this.attr(key.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase(), name[key]);
    }
    return this;
  } else{
    return arguments.length == 1 ? this.attr(name) : this.attr(name, value);
  }
};

function f(){
  var functions = arguments;
  
  //convert all string arguments into field accessors
  var i = 0, l = functions.length;
  while (i < l) {
    if (typeof(functions[i]) === 'string' || typeof(functions[i]) === 'number'){
      functions[i] = (function(str){ return function(d){ return d[str]; }; })(functions[i]);
    }
    i++;
  }

   //return composition of functions
  return function(d) {
    var i=0, l = functions.length;
    while (i++ < l) d = functions[i-1].call(this, d);
    return d;
  };
}

f.not = function(d){ return !d; };
f.run = function(d){ return d(); };
f.objToFn = function(obj, defaultVal){
  if (arguments.length == 1) defaultVal = undefined;

  return function(str){
    return typeof(obj[str]) !== undefined ? obj[str] : defaultVal;
  };
};

var st = function(name, value) {
  if (typeof(name) == 'object'){
    for (var key in name){
      addStyle(this, key, name[key]);
    }
    return this;
  } else {
    return arguments.length == 1 ? this.style(name) : addStyle(this, name, value);
  }


  function addStyle(sel, style, value){
    style = style.replace(/([a-z\d])([A-Z])/g, '$1-$2').toLowerCase();

    var pxStyles = 'top left bottom right padding-top padding-left padding-bottom padding-right border-top b-width border-left-width border-botto-width m border-right-width  margin-top margin-left margin-bottom margin-right font-size width height stroke-width line-height margin padding border max-width min-width';

    if (~pxStyles.indexOf(style) ){
      sel.style(style, typeof value == 'function' ? wrapPx(value) : addPx(value));
    } else{
      sel.style(style, value);
    }

    return sel;
  } 

  function addPx(d){ return d.match ? d : d + 'px'; }
  function wrapPx(fn){
    return function(){
      var val = fn.apply(this, arguments);
      return addPx(val)
    }

  }
};

// while this might not be reprentative for all fonts, it is
// still better than assuming every character has the same width
// (set monospace=true if you want to bypass this)
var CHAR_W = {
    A:7,a:7,B:8,b:7,C:8,c:6,D:9,d:7,E:7,e:7,F:7,f:4,G:9,g:7,H:9,h:7,I:3,i:3,J:5,j:3,K:8,k:6,L:7,l:3,M:11,
    m:11,N:9,n:7,O:9,o:7,P:8,p:7,Q:9,q:7,R:8,r:4,S:8,s:6,T:7,t:4,U:9,u:7,V:7,v:6,W:11,w:9,X:7,x:6,Y:7,y:6,Z:7,z:5,
    '.':2,',':2,':':2,';':2
};

var wordwrap = function(line, maxCharactersPerLine, minCharactersPerLine, monospace) {
    var l, lines = [], w = [], words = [], w1, maxChars, minChars, maxLineW, minLineW;
    w1 = line.split(' ');
    w1.forEach(function(s, i) {
        var w2 = s.split('-');
        if (w2.length > 1) {
            w2.forEach(function(t, j) {
                w.push(t + (j < w2.length - 1 ? '-' : ''));
            });
        } else {
            w.push(s + (i < w1.length - 1 ? ' ' : ''));
        }
    });
    maxChars = maxCharactersPerLine || 40;
    minChars = minCharactersPerLine || Math.max(3, Math.min(maxChars * 0.5, 0.75 * w.map(word_len).sort(num_asc)[Math.round(w.length / 2)]));
    maxLineW = maxChars * CHAR_W.a;
    minLineW = minChars * CHAR_W.a;
    l = 0;
    w.forEach(function(d) {
        var ww = d3Array.sum(d.split('').map(char_w));
        if (l + ww > maxLineW && l > minLineW) {
            lines.push(words.join(''));
            words.length = 0;
            l = 0;
        }
        l += ww;
        return words.push(d);
    });
    if (words.length) {
        lines.push(words.join(''));
    }
    return lines.filter(function(d) {
        return d !== '';
    });
    function char_w(c) { return !monospace && CHAR_W[c] || CHAR_W.a; }
    function word_len(d) { return d.length; }
    function num_asc(a, b) { return a - b; }
};

var ascendingKey = function(key) {
  return typeof key == 'function' ? function (a, b) {
    return key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : key(a) >= key(b) ? 0 : NaN;
  } : function (a, b) {
    return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : a[key] >= b[key] ? 0 : NaN;
  };
};

var descendingKey = function(key) {
  return typeof key == 'function' ? function (a, b) {
    return key(b) < key(a) ? -1 : key(b) > key(a) ? 1 : key(b) >= key(a) ? 0 : NaN;
  } : function (a, b) {
    return b[key] < a[key] ? -1 : b[key] > a[key] ? 1 : b[key] >= a[key] ? 0 : NaN;
  };
};

var conventions = function(c){
  c = c || {};

  c.margin = c.margin || {top: 20, right: 20, bottom: 20, left: 20}
  ;['top', 'right', 'bottom', 'left'].forEach(function(d){
    if (!c.margin[d] && c.margin[d] != 0) c.margin[d] = 20 ;
  });

  var parentNode = c.parentSel && c.parentSel.node();

  c.totalWidth  = c.totalWidth  || parentNode && parentNode.offsetWidth  || 960;
  c.totalHeight = c.totalHeight || parentNode && parentNode.offsetHeight || 500;

  c.width  = c.width  || c.totalWidth  - c.margin.left - c.margin.right;
  c.height = c.height || c.totalHeight - c.margin.top - c.margin.bottom;

  c.totalWidth = c.width + c.margin.left + c.margin.right;
  c.totalHeight = c.height + c.margin.top + c.margin.bottom;

  c.parentSel = c.parentSel || d3Selection.select('body');

  c.rootsvg = c.parentSel.append('svg');

  c.svg = c.rootsvg
      .attr('width', c.totalWidth)
      .attr('height', c.totalHeight)
    .append('g')
      .attr('transform', 'translate(' + c.margin.left + ',' + c.margin.top + ')');

  c.x = c.x || d3Scale.scaleLinear().range([0, c.width]);
  c.y = c.y || d3Scale.scaleLinear().range([c.height, 0]);

  c.xAxis = c.xAxis || d3Axis.axisBottom().scale(c.x);
  c.yAxis = c.yAxis || d3Axis.axisLeft().scale(c.y);

  c.drawAxis = function(){
    c.svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + c.height + ')')
        .call(c.xAxis);

    c.svg.append('g')
        .attr('class', 'y axis')
        .call(c.yAxis);
  };
  
  return c;
};

var clamp = function(min, d, max) {
  return Math.max(min, Math.min(max, d))
};

var attachTooltip = function(sel, tooltipSel, fieldFns){
  if (!sel.size()) return;

  tooltipSel = tooltipSel || d3Selection.select('.tooltip');

  sel 
      .on('mouseover.attachTooltip', ttDisplay)
      .on('mousemove.attachTooltip', ttMove)
      .on('mouseout.attachTooltip',  ttHide)
      .on('click.attachTooltip', function(d){ console.log(d); });

  var d = sel.datum();
  fieldFns = fieldFns || d3Collection.keys(d)
      .filter(function(str){
        return (typeof d[str] != 'object') && (d[str] != 'array');
      })
      .map(function(str){
        return function(d){ return str + ': <b>' + d[str] + '</b>'; };
      });

  function ttDisplay(d){
    tooltipSel
        .classed('tooltip-hidden', false)
        .html('')
      .appendMany(fieldFns, 'div')
        .html(function(fn){ return fn(d); });

    d3Selection.select(this).classed('tooltipped', true);
  }

  function ttMove(d){
    if (!tooltipSel.size()) return;

    var e = d3Selection.event,
        x = e.clientX,
        y = e.clientY,
        bb = tooltipSel.node().getBoundingClientRect(),
        left = clamp(20, (x-bb.width/2), window.innerWidth - bb.width - 20),
        top = innerHeight > y + 20 + bb.height ? y + 20 : y - bb.height - 20;

    tooltipSel
      .style('left', left +'px')
      .style('top', top + 'px');
  }

  function ttHide(d){
    tooltipSel.classed('tooltip-hidden', true);

    d3Selection.selectAll('.tooltipped').classed('tooltipped', false);
  }
};

var loadData = function(){
  var q = d3Queue.queue();
  
  var args = [].slice.call(arguments);
  var files = args.slice(0, args.length - 1);
  var cb = args[args.length - 1];

  files.forEach(function(d){
    var type = d.split('?')[0].split('.').reverse()[0];

    var loadFn = {csv: d3Request.csv, tsv: d3Request.tsv, json: d3Request.json}[type];
    if (!loadFn) return cb(new Error('Invalid type', d));
    q.defer(loadFn, d) ;
  });
  q.awaitAll(cb);
};

var nestBy = function(array, key){
  return d3Collection.nest().key(key).entries(array).map(function(d){
    d.values.key = d.key;
    return d.values;
  });
};

var round = function(n, p) {
  return p ? Math.round(n * (p = Math.pow(10, p))) / p : Math.round(n);
};

// Clips the specified subject polygon to the specified clip polygon;
// requires the clip polygon to be counterclockwise and convex.
// https://en.wikipedia.org/wiki/Sutherland–Hodgman_algorithm
var polygonClip = function(clip, subject) {
  var input,
      closed = polygonClosed(subject),
      i = -1,
      n = clip.length - polygonClosed(clip),
      j,
      m,
      a = clip[n - 1],
    b,
    c,
    d;

  while (++i < n) {
    input = subject.slice();
    subject.length = 0;
    b = clip[i];
    c = input[(m = input.length - closed) - 1];
    j = -1;
    while (++j < m) {
      d = input[j];
      if (polygonInside(d, a, b)) {
        if (!polygonInside(c, a, b)) {
          subject.push(polygonIntersect(c, d, a, b));
        }
        subject.push(d);
      } else if (polygonInside(c, a, b)) {
        subject.push(polygonIntersect(c, d, a, b));
      }
      c = d;
    }
    if (closed) subject.push(subject[0]);
    a = b;
  }

  return subject;
};

function polygonInside(p, a, b) {
  return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
}

// Intersect two infinite lines cd and ab.
function polygonIntersect(c, d, a, b) {
  var x1 = c[0], x3 = a[0], x21 = d[0] - x1, x43 = b[0] - x3,
      y1 = c[1], y3 = a[1], y21 = d[1] - y1, y43 = b[1] - y3,
      ua = (x43 * (y1 - y3) - y43 * (x1 - x3)) / (y43 * x21 - x43 * y21);
  return [x1 + ua * x21, y1 + ua * y21];
}

// Returns true if the polygon is closed.
function polygonClosed(coordinates) {
  var a = coordinates[0],
      b = coordinates[coordinates.length - 1];
  return !(a[0] - b[0] || a[1] - b[1]);
}

d3Selection.selection.prototype.translate = translateSelection;
d3Transition.transition.prototype.translate = translateSelection;
d3Selection.selection.prototype.append = append;
d3Selection.selection.prototype.insert = insert;
d3Selection.selection.prototype.parent = parent;
d3Selection.selection.prototype.selectAppend = selectAppend;
d3Selection.selection.prototype.tspans = tspans;
d3Selection.selection.prototype.appendMany = appendMany;
d3Selection.selection.prototype.at = at;
d3Selection.selection.prototype.st = st;
d3Transition.transition.prototype.at = at;
d3Transition.transition.prototype.st = st;
d3Selection.selection.prototype.prop = d3Selection.selection.prototype.property;

exports.wordwrap = wordwrap;
exports.parseAttributes = parseAttributes;
exports.f = f;
exports.ascendingKey = ascendingKey;
exports.descendingKey = descendingKey;
exports.conventions = conventions;
exports.attachTooltip = attachTooltip;
exports.loadData = loadData;
exports.nestBy = nestBy;
exports.round = round;
exports.clamp = clamp;
exports.polygonClip = polygonClip;

Object.defineProperty(exports, '__esModule', { value: true });

})));
