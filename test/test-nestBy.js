var tape = require('tape'),
    jetpack = require('../');


tape('nestBy sets returns an array of arrays with key props', function(test) {
  var bySign = jetpack.nestBy([1, 2, 3, 4], function(d){ return d > 0 })
  console.log(bySign[0].key)
  test.equal(bySign[0].length, 4);
  test.equal(bySign[0].key, 'true');
  test.end();
});

tape('nestBy divides items into seperate groups', function(test) {
  var byEven = jetpack.nestBy([1, 2, 3, 4], function(d){ return d % 2 == 0 })
  test.equal(byEven[0].length, 2);
  test.equal(byEven[1].length, 2);
  test.equal(byEven[0].key == 'true', byEven[1].key != 'true');
  test.end();
});


