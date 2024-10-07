import {test} from 'node:test';
import Minhash from '../src/minhash.js';
import LshIndex from '../src/lsh.js';
import assert from 'node:assert';

test('LshIndex insertions', (t) => {
  const index = new LshIndex();
  const m1 = new Minhash();
  
  index.insert('m1', m1);
  assert.notDeepEqual(index, {});
});

test('LshIndex queries', (t) => {
  const m1 = new Minhash();
  const m2 = new Minhash();
  const index = new LshIndex();
  
  m1.update('hello');
  m2.update('hello');
  index.insert('m1', m1);
  index.insert('m2', m2);
  
  const results = index.query(m1);
  assert.isTrue(results.includes('m2'));
});

test('LshIndex hashbands', (t) => {
  const m1 = new Minhash();
  const index = new LshIndex();
  
  index.insert('m1', m1);
  assert.isTrue(m1.hashbands.length > 0);
});

test('LshIndex allows users to set hashband length', (t) => {
  const m1 = new Minhash();
  const index = new LshIndex({ bandSize: 3 });
  
  index.insert('m1', m1);
  assert.isTrue(m1.hashbands[0].split('.').length === 3);
});
