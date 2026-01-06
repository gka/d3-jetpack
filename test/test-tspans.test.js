import {it, expect} from 'vitest';
import makeDocument from './helpers/makeDocument.js';
import '../index.js';
import * as d3 from 'd3-selection';

it('tspans adds a tspans and sets text', function() {
  var document = globalThis.document = makeDocument("<svg><text></text></svg>");

  try {
    d3.select('text').tspans([1, 2, 3])
    expect(d3.selectAll('tspan').size()).toBe(3);
    expect(d3.select('text').text()).toBe('123');
  } finally {
    delete globalThis.document;
  }
});
