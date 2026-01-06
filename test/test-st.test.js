import {it, expect} from 'vitest';
import makeDocument from './helpers/makeDocument.js';
import '../index.js';
import * as d3 from 'd3-selection';

it('st can look up styles', function() {
  var document = makeDocument('<div style="background: green"></div>')

  var prop = d3.select(document.querySelector('div')).st('background')
  expect(prop).toBe('green')
})

it('st can set styles', function() {
  var document = makeDocument('<div></div>')

  d3.select(document.querySelector('div')).st('background', 'green')

  expect(d3.select(document.querySelector('div')).st('background')).toBe('green')
})

it('st can set style with an object', function() {
  var document = makeDocument('<div></div>')

  var sel = d3.select(document.querySelector('div'))

  sel.st({color: 'blue', width: '100px'})

  expect(sel.style('color')).toBe('blue')
  expect(sel.style('width')).toBe('100px')
})

it('camelcase is converted to hypens', function() {
  var document = makeDocument('<div></div>')

  var sel = d3.select(document.querySelector('div'))

  sel.st({fillOpacity: 1, maxWidth: '100px'})

  expect(sel.style('fill-opacity')).toBe('1')
  expect(sel.style('max-width')).toBe('100px')
})

it('px is appened to numbers', function() {
  var document = makeDocument('<div></div>')

  var sel = d3.select(document.querySelector('div'))

  sel.st({margin: 1, maxWidth: 100})
  sel.st('height', 20)

  expect(sel.style('margin')).toBe('1px')
  expect(sel.style('max-width')).toBe('100px')
  expect(sel.style('height')).toBe('20px')
})
