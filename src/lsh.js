/**
 * Main class for indexing Minhash signatures
 **/

class LshIndex {
  constructor(args = { bandSize: 4 }) {
    this.bandSize = args.bandSize;
    this.index = {};
  }

  insert(key, minhash) {
    const hashbands = this.getHashbands(minhash);

    hashbands.forEach(band => {
      if (!this.index[band]) {
        this.index[band] = [];
      }
      this.index[band].push(key);
    });
  }

  query(minhash) {
    const matches = new Set();
    const hashbands = this.getHashbands(minhash);

    hashbands.forEach(band => {
      if (this.index[band]) {
        this.index[band].forEach(key => matches.add(key));
      }
    });

    return Array.from(matches);
  }

  getHashbands(minhash) {
    if (minhash.hashbands) return minhash.hashbands;
    
    const { hashvalues } = minhash;
    const hashbands = [];

    for (let i = 0; i < hashvalues.length; i += this.bandSize) {
      const band = hashvalues.slice(i, i + this.bandSize).join('.');
      hashbands.push(band);
    }
    
    minhash.hashbands = hashbands;
    return hashbands;
  }
}

export default LshIndex;
