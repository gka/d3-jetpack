var tape = require('tape'),
    jetpack = require('../'),
    jsdom = require('jsdom'),
    svgdom = require('svgdom'),
    d3 = require('d3-selection');

// svg translate

tape('translate can take an array and set transform attr on svg element', function(test) {
  var svg = svgdom.document.documentElement;
  d3.select(svg).translate([10, 10]);
  test.equal(svg.getAttribute('transform'), 'translate(10,10)');
  test.end();
});

tape('translate can take an array and set transform attr on svg element', function(test) {
  var svg = svgdom.document.documentElement;
  d3.select(svg).translate(function(){ return [10, 10]; });
  test.equal(svg.getAttribute('transform'), 'translate(10,10)');
  test.end();
});

tape('translate can take dim parameter to work on single dimension - svg', function(test) {
  var svg = svgdom.document.documentElement;
  d3.select(svg).translate(10, 0);
  test.equal(svg.getAttribute('transform'), 'translate(10,0)');
  test.end();
});

tape('translate can take dim parameter to work on single dimension - svg', function(test) {
  var svg = svgdom.document.documentElement;
  d3.select(svg).translate(function() { return 10; }, 1);
  test.equal(svg.getAttribute('transform'), 'translate(0,10)');
  test.end();
});

// html translate

tape('translate can take an array and set transform style on html element', function(test) {
  var document = jsdom.jsdom();
  d3.select(document.body).translate([10, 10]);
  test.equal(document.body.style.transform, 'translate(10px,10px)');
  test.end();
});

tape('translate can take a function and set transform string on html element', function(test) {
  var document = jsdom.jsdom();
  d3.select(document.body).translate(function(){ return [10, 10]; });
  test.equal(document.body.style.transform, 'translate(10px,10px)');
  test.end();
});

tape('translate can take dim parameter to work on single dimension - html', function(test) {
  var document = jsdom.jsdom();
  d3.select(document.body).translate(10, 1);
  test.equal(document.body.style.transform, 'translate(0px,10px)');
  test.end();
});

tape('translate can take dim parameter to work on single dimension - html', function(test) {
  var document = jsdom.jsdom();
  d3.select(document.body).translate(function() { return 10; }, 0);
  test.equal(document.body.style.transform, 'translate(10px,0px)');
  test.end();
});
