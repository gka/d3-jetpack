var tape = require('tape'),
    jetpack = require('../'),
    jsdom = require('jsdom'),
    d3 = require('d3-selection')


tape('st can look up styles', function(test) {
  var document = jsdom.jsdom('<div style="background: green"></div>')

  var prop = d3.select(document.querySelector('div')).st('background')
  test.equal(prop, 'green')
  test.end()
})

tape('st can set styles', function(test) {
  var document = jsdom.jsdom('<div></div>')

  d3.select(document.querySelector('div')).st('background', 'green')

  test.equal(d3.select(document.querySelector('div')).st('background'), 'green')
  test.end()
})

tape('st can set style with an object', function(test) {
  var document = jsdom.jsdom('<div></div>')

  var sel = d3.select(document.querySelector('div'))

  sel.st({color: 'blue', width: '100px'})

  test.equal(sel.style('color'), 'blue')
  test.equal(sel.style('width'), '100px')
  test.end()
})

tape('camelcase is converted to hypens', function(test) {
  var document = jsdom.jsdom('<div></div>')

  var sel = d3.select(document.querySelector('div'))

  sel.st({fillOpacity: 1, maxWidth: '100px'})

  test.equal(sel.style('fill-opacity'), '1')
  test.equal(sel.style('max-width'), '100px')
  test.end()
})

tape('px is appened to numbers', function(test) {
  var document = jsdom.jsdom('<div></div>')

  var sel = d3.select(document.querySelector('div'))

  sel.st({margin: 1, maxWidth: 100})
  sel.st('height', 20)

  test.equal(sel.style('margin'), '1px')
  test.equal(sel.style('max-width'), '100px')
  test.equal(sel.style('height'), '20px')
  test.end()
})