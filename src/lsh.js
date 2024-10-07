/**
 * Main class for indexing Minhash signatures
 **/

class LshIndex {
  constructor(args = { bandSize: 4 }) {
    this.bandSize = args.bandSize;
    this.index = new Map();
  }

  insert(key, minhash) {
    const hashbands = this.getHashbands(minhash);

    for (const band of hashbands) {
      if (!this.index.has(band)) {
        this.index.set(band, []);
      }
      this.index.get(band).push(key);
    }
  }

  query(minhash) {
    const matches = new Set();
    const hashbands = this.getHashbands(minhash);

    for (const band of hashbands) {
      if (this.index.has(band)) {
        for (const key of this.index.get(band)) {
          matches.add(key);
        }
      }
    }

    return Array.from(matches);
  }

  getHashbands(minhash) {
    if (minhash.hashbands) return minhash.hashbands;

    const { hashvalues } = minhash;
    const hashbands = [];

    for (let i = 0; i < hashvalues.length; i += this.bandSize) {
      const band = hashvalues.subarray(i, i + this.bandSize).join('.');
      hashbands.push(band);
    }

    minhash.hashbands = hashbands;
    return hashbands;
  }
}

export default LshIndex;
