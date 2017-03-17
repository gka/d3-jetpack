var tape = require('tape'),
    jetpack = require('../'),
    jsdom = require('jsdom'),
    d3 = require('d3-selection');


tape('append adds a class and id', function(test) {
  var document = jsdom.jsdom('<div></div>');

  d3.select(document.querySelector('div')).append('span#id.class');

  var span = document.querySelector('span');
  test.equal(span.getAttribute('id'), 'id');
  test.equal(span.getAttribute('class'), 'class');
  test.end();
});