import {it, expect} from 'vitest';
import * as jetpack from '../index.js';

it('clamp uses min', function() {
  expect(jetpack.clamp(0, -1, 10)).toBe(0);
});

it('clamp uses max', function() {
  expect(jetpack.clamp(-10, -1, 1)).toBe(-1);
});

it('clamp uses middle', function() {
  expect(jetpack.clamp(10, 30, 100)).toBe(30);
});
