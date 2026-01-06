import {it, expect} from 'vitest';
import * as jetpack from '../index.js';

it('nestBy sets returns an array of arrays with key props', function() {
  var bySign = jetpack.nestBy([1, 2, 3, 4], function(d){ return d > 0 })
  expect(bySign[0].length).toBe(4);
  expect(bySign[0].key).toBe('true');
});

it('nestBy divides items into seperate groups', function() {
  var byEven = jetpack.nestBy([1, 2, 3, 4], function(d){ return d % 2 == 0 })
  expect(byEven[0].length).toBe(2);
  expect(byEven[1].length).toBe(2);
  expect(byEven[0].key == 'true').toBe(byEven[1].key != 'true');
});

