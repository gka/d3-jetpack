var tape = require('tape'),
    jetpack = require('../build/d3-jetpack.cjs'),
    makeDocument = require('./helpers/makeDocument.cjs'),
    d3 = require('d3-selection');

tape('at can look up attributes', function(test) {
  var document = makeDocument('<div prop="propVal"></div>');

  var prop = d3.select(document.querySelector('div')).at('prop')
  test.equal(prop, 'propVal');
  test.end();
});

tape('at can set attributes', function(test) {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).at('prop', 'propVal');

  test.equal(document.querySelector('div').getAttribute('prop'), 'propVal');
  test.end();
});

tape('at can set attributes with an object', function(test) {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).at({prop: 'propVal', width: 100});

  test.equal(document.querySelector('div').getAttribute('prop'), 'propVal');
  test.equal(document.querySelector('div').getAttribute('width'), '100');
  test.end();
});

tape('camelcase is converted to hypens', function(test) {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).at({fillOpacity: 'propVal', maxWidth: 100});

  test.equal(document.querySelector('div').getAttribute('fill-opacity'), 'propVal');
  test.equal(document.querySelector('div').getAttribute('max-width'), '100');
  test.end();
});

tape('blacklisted camelcase attrs are not hyphenized', function(test) {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).at({viewBox: '0 0 10 10', markerWidth: '10'});

  test.equal(document.querySelector('div').getAttribute('viewBox'), '0 0 10 10');
  test.equal(document.querySelector('div').getAttribute('markerWidth'), '10');
  test.end();
});
