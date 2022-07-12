/**
 * Main class for indexing Minhash signatures
 **/
class LshIndex {
  constructor(args) {
  var args = args || {};
  this.bandSize = args.bandSize || 4;
  this.index = {};
  }

  insert(key, minhash) { 
    const hashBands = this.getHashBands(minhash);

    hashBands.forEach(band => {
      if (Array.isArray(this.index[band])) {
        this.index[band].push(key);
      } else {
        this.index[band] = [key];
      }
    });
  };

 query(minhash) {
    const matches = {};
    const hashBands = this.getHashBands(minhash);

    hashBands.forEach(band => {
      for (let j = 0; j < this.index[band].length; j++) {
        matches[this.index[band][j]] = true;
      }
    });

    return Object.keys(matches);
  };

  getHashBands(minhash) {
    if (minhash.hashBands) return minhash.hashBands;
    minhash.hashBands = [];
    for (let i = 0; i < minhash.hashValues.length / this.bandSize; i++) {
      const start = i * this.bandSize;
      const end = start + this.bandSize;
      const band = minhash.hashValues.slice(start, end);
      minhash.hashBands.push(band.join('.'));
    }
    return minhash.hashBands;
  };
};

export default LshIndex;
