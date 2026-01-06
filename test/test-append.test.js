import {it, expect} from 'vitest';
import makeDocument from './helpers/makeDocument.js';
import '../index.js';
import * as d3 from 'd3-selection';

it('append adds a class and id', function() {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).append('span#id.class');

  var span = document.querySelector('span');
  expect(span.getAttribute('id')).toBe('id');
  expect(span.getAttribute('class')).toBe('class');
});

it('append takes a function', function() {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div'))
    .append(d => document.createElement('span'))
    .attr('id', 'id')
    .attr('class', 'class')

  var span = document.querySelector('span');
  expect(span.getAttribute('id')).toBe('id');
  expect(span.getAttribute('class')).toBe('class');
});
