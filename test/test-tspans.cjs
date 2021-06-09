var tape = require('tape'),
    jetpack = require('../build/d3-jetpack.cjs'),
    makeDocument = require('./helpers/makeDocument.cjs'),
    d3 = require('d3-selection');


tape('tspans adds a tspans and sets text', function(test) {
  var document = global.document = makeDocument("<svg><text></text></svg>");

  try {
    d3.select('text').tspans([1, 2, 3])
    test.equal(d3.selectAll('tspan').size(), 3);
    test.equal(d3.select('text').text(), '123');
    test.end();
  } finally {
    delete global.document;
  }
});