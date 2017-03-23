var tape = require('tape'),
    jetpack = require('../'),
    ƒ = jetpack.f


tape('ƒ with no arguements is the identity function', function(test) {
  test.equal(ƒ()(10), 10);
  test.end();
});

tape('strings return object accessors', function(test) {
  test.equal(ƒ('prop')({prop: 'myProp'}), 'myProp');
  test.end();
});

tape('function are composed', function(test) {
  function addOne(d){ return d + 1 }
  test.equal(ƒ('num', addOne)({num: 10.3}), 11.3);
  test.end();
});

tape('function are composed', function(test) {
  function addOne(d){ return d + 1 }
  test.equal(ƒ(addOne, addOne)(10) , 12);
  test.end();
});