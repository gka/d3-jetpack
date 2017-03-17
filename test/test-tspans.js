var tape = require('tape'),
    jetpack = require('../'),
    jsdom = require('jsdom'),
    d3 = require('d3-selection');


tape('tspans adds a tspans and sets text', function(test) {
  var document = global.document = jsdom.jsdom("<svg><text></text></svg>");

  try {
    d3.select('text').tspans([1, 2, 3])
    test.equal(d3.selectAll('tspan').size(), 3);
    test.equal(d3.select('text').text(), '123');
    test.end();
  } finally {
    delete global.document;
  }
});