import {it, expect} from 'vitest';
import makeDocument from './helpers/makeDocument.js';
import {createSVGDocument} from 'svgdom';
import '../index.js';
import * as d3 from 'd3-selection';
// svg translate

it('translate can take an array and set transform attr on svg element', function() {
  var document = createSVGDocument();
  var svg = document.documentElement;
  d3.select(svg).translate([10, 10]);
  expect(svg.getAttribute('transform')).toBe('translate(10,10)');
});

it('translate can take an array and set transform attr on svg element', function() {
  var document = createSVGDocument();
  var svg = document.documentElement;
  d3.select(svg).translate(function(){ return [10, 10]; });
  expect(svg.getAttribute('transform')).toBe('translate(10,10)');
});

it('translate can take dim parameter to work on single dimension - svg', function() {
  var document = createSVGDocument();
  var svg = document.documentElement;
  d3.select(svg).translate(10, 0);
  expect(svg.getAttribute('transform')).toBe('translate(10,0)');
});

it('translate can take dim parameter to work on single dimension - svg', function() {
  var document = createSVGDocument();
  var svg = document.documentElement;
  d3.select(svg).translate(function() { return 10; }, 1);
  expect(svg.getAttribute('transform')).toBe('translate(0,10)');
});

// html translate

it('translate can take an array and set transform style on html element', function() {
  var document = makeDocument();
  d3.select(document.body).translate([10, 10]);
  expect(document.body.style.transform).toBe('translate(10px,10px)');
});

it('translate can take a function and set transform string on html element', function() {
  var document = makeDocument();
  d3.select(document.body).translate(function(){ return [10, 10]; });
  expect(document.body.style.transform).toBe('translate(10px,10px)');
});

it('translate can take dim parameter to work on single dimension - html', function() {
  var document = makeDocument();
  d3.select(document.body).translate(10, 1);
  expect(document.body.style.transform).toBe('translate(0px,10px)');
});

it('translate can take dim parameter to work on single dimension - html', function() {
  var document = makeDocument();
  d3.select(document.body).translate(function() { return 10; }, 0);
  expect(document.body.style.transform).toBe('translate(10px,0px)');
});


it('translate does not break on empty selections', function() {
  var document = makeDocument();
  d3.select(document.body)
    .select('.no-element')
    .translate(function() { return 10; }, 0);
});
