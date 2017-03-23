var tape = require('tape'),
    jetpack = require('../');


tape('parseAttributes can read a class and id', function(test) {
  var obj = jetpack.parseAttributes('div.className#idName');
  test.equal(obj.tag, 'div');
  test.equal(obj.attr.class, 'className');
  test.equal(obj.attr.id, 'idName');
  test.end();
});


tape('parseAttributes can read multiple classes', function(test) {
  var obj = jetpack.parseAttributes('div.class1.class2');
  test.equal(obj.attr.class, 'class1 class2');
  test.end();
});

tape('parseAttributes can read tags', function(test) {
  var obj = jetpack.parseAttributes('span');
  test.equal(obj.tag, 'span');
  test.end();
});