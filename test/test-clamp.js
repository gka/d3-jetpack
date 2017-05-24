var tape = require('tape'),
    jetpack = require('../');


tape('clamp uses min', function(test) {
  test.equal(jetpack.clamp(0, -1, 10), 0);
  test.end();
});

tape('clamp uses max', function(test) {
  test.equal(jetpack.clamp(-10, -1, 1), -1);
  test.end();
});

tape('clamp uses middle', function(test) {
  test.equal(jetpack.clamp(10, 30, 100), 30);
  test.end();
});
