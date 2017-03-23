var tape = require('tape'),
    jetpack = require('../'),
    jsdom = require('jsdom'),
    d3 = require('d3-selection');


tape('selectAppend selects when element exists', function(test) {
  var document = jsdom.jsdom('<div><span></span></div>');

  var span = document.querySelector('span')

  var d3Span = d3.select(document.querySelector('div'))
    .selectAppend('span').node();

  test.equal(span, d3Span);
  test.end();
});

tape('selectAppend appends when element doesn\'t exist', function(test) {
  var document = jsdom.jsdom('<div></div>');

  var d3Span = d3.select(document.querySelector('div'))
    .selectAppend('span').node();

  var span = document.querySelector('span')

  test.equal(span, d3Span);
  test.end();
});

tape('selectAppend selects each child when element exists', function(test) {
  var document = jsdom.jsdom('<div><span></span></div><div><span></span></div>');

  var spans = document.querySelectorAll('span')

  var d3Spans = d3.select(document).selectAll('div')
    .selectAppend('span');

  d3Spans.each(function(d, i) {
    test.equal(spans[i], this);
  })

  test.end();
});

tape('selectAppend append each child when element exists', function(test) {
  var document = jsdom.jsdom('<div></div><div></div>');

  var d3Spans = d3.select(document).selectAll('div')
    .selectAppend('span');

  var spans = document.querySelectorAll('span')

  d3Spans.each(function(d, i) {
    test.equal(spans[i], this);
  })

  test.end();
});

tape('selectAppend should select or append each child element based on whether they exist', function(test) {
  var document = jsdom.jsdom('<div><span></span></div><div></div>');

  var d3Spans = d3.select(document).selectAll('div')
    .selectAppend('span');

  var spans = document.querySelectorAll('span')

  test.equal(d3Spans.size(), 2);

  d3Spans.each(function(d, i) {
    test.equal(spans[i], this);
  })

  test.end();
});


tape('selectAppend adds a class and id', function(test) {
  var document = jsdom.jsdom('<div></div>');

  d3.select(document.querySelector('div')).selectAppend('span#id.class');

  var span = document.querySelector('span');
  test.equal(span.getAttribute('id'), 'id');
  test.equal(span.getAttribute('class'), 'class');
  test.end();
});
