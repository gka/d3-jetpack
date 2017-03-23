var tape = require('tape'),
    jetpack = require('../'),
    jsdom = require('jsdom'),
    d3 = require('d3-selection');


tape('at can look up attributes', function(test) {
  var document = jsdom.jsdom('<div prop="propVal"></div>');

  var prop = d3.select(document.querySelector('div')).at('prop')
  test.equal(prop, 'propVal');
  test.end();
});

tape('at can set attributes', function(test) {
  var document = jsdom.jsdom('<div></div>');

  d3.select(document.querySelector('div')).at('prop', 'propVal');

  test.equal(document.querySelector('div').getAttribute('prop'), 'propVal');
  test.end();
});

tape('at can set attributes with an object', function(test) {
  var document = jsdom.jsdom('<div></div>');

  d3.select(document.querySelector('div')).at({prop: 'propVal', width: 100});

  test.equal(document.querySelector('div').getAttribute('prop'), 'propVal');
  test.equal(document.querySelector('div').getAttribute('width'), '100');
  test.end();
});

tape('camelcase is converted to hypens', function(test) {
  var document = jsdom.jsdom('<div></div>');

  d3.select(document.querySelector('div')).at({fillOpacity: 'propVal', maxWidth: 100});

  test.equal(document.querySelector('div').getAttribute('fill-opacity'), 'propVal');
  test.equal(document.querySelector('div').getAttribute('max-width'), '100');
  test.end();
});