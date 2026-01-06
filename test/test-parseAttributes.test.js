import {it, expect} from 'vitest';
import * as jetpack from '../index.js';

it('parseAttributes can read a class and id', function() {
  var obj = jetpack.parseAttributes('div.className#idName');
  expect(obj.tag).toBe('div');
  expect(obj.attr.class).toBe('className');
  expect(obj.attr.id).toBe('idName');
});


it('parseAttributes can read multiple classes', function() {
  var obj = jetpack.parseAttributes('div.class1.class2');
  expect(obj.attr.class).toBe('class1 class2');
});

it('parseAttributes can read tags', function() {
  var obj = jetpack.parseAttributes('span');
  expect(obj.tag).toBe('span');
});
