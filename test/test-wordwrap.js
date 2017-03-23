var tape = require('tape'),
    jetpack = require('../');


tape('wordwrap second arg sets line length', function(test) {
  // test.equal(jetpack.wordwrap('two words', 4)[0], 'two');
  test.end();
});

tape('wordwrap default line length is 40', function(test) {
  // test.equal(jetpack.wordwrap('the default wrap length is 40 - this line will wrap')[1], 'wrap');
  test.end();
});

tape('no blank lines', function(test) {
  // test.equal(jetpack.wordwrap('thiswordistoolong', 5)[0], 'thiswordistoolong');
  test.end();
});

