var tape = require('tape'),
    makeDocument = require('./helpers/makeDocument.cjs'),
    jetpack = require('../build/d3-jetpack.cjs'),
    d3 = require('d3-selection');


tape('append adds a class and id', function(test) {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div')).append('span#id.class');

  var span = document.querySelector('span');
  test.equal(span.getAttribute('id'), 'id');
  test.equal(span.getAttribute('class'), 'class');
  test.end();
});


tape('append takes a function', function(test) {
  var document = makeDocument('<div></div>');

  d3.select(document.querySelector('div'))
    .append(d => document.createElement('span'))
    .attr('id', 'id')
    .attr('class', 'class')

  var span = document.querySelector('span');
  test.equal(span.getAttribute('id'), 'id');
  test.equal(span.getAttribute('class'), 'class');
  test.end();
});