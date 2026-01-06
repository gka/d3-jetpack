import {it, expect} from 'vitest';
import makeDocument from './helpers/makeDocument.js';
import '../index.js';
import * as d3 from 'd3-selection';

it('selectAppend selects when element exists', function() {
  var document = makeDocument('<div><span></span></div>');

  var span = document.querySelector('span')

  var d3Span = d3.select(document.querySelector('div'))
    .selectAppend('span').node();

  expect(span).toBe(d3Span);
});

it('selectAppend appends when element doesn\'t exist', function() {
  var document = makeDocument('<div></div>');

  var d3Span = d3.select(document.querySelector('div'))
    .selectAppend('span').node();

  var span = document.querySelector('span')

  expect(span).toBe(d3Span);
});

it('selectAppend selects each child when element exists', function() {
  var document = makeDocument('<div><span></span></div><div><span></span></div>');

  var spans = document.querySelectorAll('span')

  var d3Spans = d3.select(document).selectAll('div')
    .selectAppend('span');

  d3Spans.each(function(d, i) {
    expect(spans[i]).toBe(this);
  })
});

it('selectAppend append each child when element exists', function() {
  var document = makeDocument('<div></div><div></div>');

  var d3Spans = d3.select(document).selectAll('div')
    .selectAppend('span');

  var spans = document.querySelectorAll('span')

  d3Spans.each(function(d, i) {
    expect(spans[i]).toBe(this);
  })
});

it('selectAppend should select or append each child element based on whether they exist', function() {
  var document = makeDocument('<div><span></span></div><div></div>');

  var d3Spans = d3.select(document).selectAll('div')
    .selectAppend('span');

  var spans = document.querySelectorAll('span')

  expect(d3Spans.size()).toBe(2);

  d3Spans.each(function(d, i) {
    expect(spans[i]).toBe(this);
  })
});


it('selectAppend adds a class and id', function() {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).selectAppend('span#id.class');

  var span = document.querySelector('span');
  expect(span.getAttribute('id')).toBe('id');
  expect(span.getAttribute('class')).toBe('class');
});
