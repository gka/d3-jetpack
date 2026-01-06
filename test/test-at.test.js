import {it, expect} from 'vitest';
import makeDocument from './helpers/makeDocument.js';
import '../index.js';
import * as d3 from 'd3-selection';

it('at can look up attributes', function() {
  var document = makeDocument('<div prop="propVal"></div>');

  var prop = d3.select(document.querySelector('div')).at('prop')
  expect(prop).toBe('propVal');
});

it('at can set attributes', function() {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).at('prop', 'propVal');

  expect(document.querySelector('div').getAttribute('prop')).toBe('propVal');
});

it('at can set attributes with an object', function() {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).at({prop: 'propVal', width: 100});

  expect(document.querySelector('div').getAttribute('prop')).toBe('propVal');
  expect(document.querySelector('div').getAttribute('width')).toBe('100');
});

it('camelcase is converted to hypens', function() {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).at({fillOpacity: 'propVal', maxWidth: 100});

  expect(document.querySelector('div').getAttribute('fill-opacity')).toBe('propVal');
  expect(document.querySelector('div').getAttribute('max-width')).toBe('100');
});

it('blacklisted camelcase attrs are not hyphenized', function() {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).at({viewBox: '0 0 10 10', markerWidth: '10'});

  expect(document.querySelector('div').getAttribute('viewBox')).toBe('0 0 10 10');
  expect(document.querySelector('div').getAttribute('markerWidth')).toBe('10');
});
