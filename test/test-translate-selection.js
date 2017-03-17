var tape = require('tape'),
    jetpack = require('../'),
    jsdom = require('jsdom'),
    d3 = require('d3-selection');


tape('translate can take an array and set transform string', function(test) {
  var document = jsdom.jsdom();
  d3.select(document.body).translate([10, 10]);
  test.equal(document.body.getAttribute('transform'), 'translate(10,10)');
  test.end();
});


tape('translate can take a function and set transform string', function(test) {
  var document = jsdom.jsdom();
  d3.select(document.body).translate(function(){ return [10, 10] });
  test.equal(document.body.getAttribute('transform'), 'translate(10,10)');
  test.end();
});
