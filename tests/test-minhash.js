import assert from 'assert';
import Minhash from '../src/minhash.js';

import { describe, it, test } from 'node:test';
const m1 = new Minhash();

  test('should all be less than max hash', function() {
    m1.hashvalues.forEach(function(v) {
      assert.strictEqual(v <= m1.maxHash, true);
    });
  });

  test('should update', function() {
    const _m1 = JSON.parse(JSON.stringify(m1));
    let updated = false;
    m1.update('cats');
    m1.hashvalues.forEach(function(v, i) {
      if (_m1.hashvalues[i] !== m1.hashvalues[i]) updated = true;
    });
    assert.strictEqual(updated, true);
  });

  test('should have len() === minhash.numPerm', function() {
    const m2 = new Minhash({ numPerm: 256 });
    assert.strictEqual(m2.hashvalues.length, m2.numPerm);
  }); 

/*
test('minhash', function() {
  const m1 = new Minhash();


  describe('permutations', function() {
    it('aPerm.length should equal bPerm.length', function() {
      assert.strictEqual(m1.permA.length, m1.permB.length);
    });

    it('should be larger than 0 and less than maxHash', function() {
      m1.permA.forEach(function(p) {
        const inRange = p >= 0 && p <= m1.maxHash;
        assert.strictEqual(inRange, true);
      });
    });

    it('should not contain duplicates', function() {
      const seen = {};
      let vals = 0;
      const perms = [m1.permA, m1.permB];
      for (let i = 0; i < perms.length; i++) {
        for (let j = 0; j < perms[i].length; j++) {
          seen[perms[i][j]] = true;
          vals++;
        }
      }
      assert.strictEqual(Object.keys(seen).length, vals);
    });
  });

  describe('jaccard', function() {
    it('should error when minhash seeds differ', function() {
      const m1 = new Minhash({ seed: 2 });
      const m2 = new Minhash({ seed: 3 });
      assert.throws(() => {
        m1.jaccard(m2);
      }, Error);
    });

    it('should error when hashvalue length differ', function() {
      const m1 = new Minhash({ numPerm: 128 });
      const m2 = new Minhash({ numPerm: 256 });
      assert.throws(() => {
        m1.jaccard(m2);
      }, Error);
    });
  });

  describe('randint', function() {
    it('should return values >=0 and <= maxHash', function() {
      const m1 = new Minhash();
      for (let i = 0; i < 1000; i++) {
        const num = m1.randInt();
        assert.strictEqual(num >= 0 && num <= m1.maxHash, true);
      }
    });
  });
});
*/