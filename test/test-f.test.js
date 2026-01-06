import {it, expect} from 'vitest';
import * as jetpack from '../index.js';

var ƒ = jetpack.f

it('ƒ with no arguements is the identity function', function() {
  expect(ƒ()(10)).toBe(10);
});

it('strings return object accessors', function() {
  expect(ƒ('prop')({prop: 'myProp'})).toBe('myProp');
});

it('function are composed', function() {
  function addOne(d){ return d + 1 }
  expect(ƒ('num', addOne)({num: 10.3})).toBe(11.3);
});

it('function are composed', function() {
  function addOne(d){ return d + 1 }
  expect(ƒ(addOne, addOne)(10)).toBe(12);
});
