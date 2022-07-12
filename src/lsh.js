/**
 * Main class for indexing Minhash signatures
 **/

class LshIndex {
  constructor(args={bandSize:4}) {
  
  this.bandSize = args.bandSize;
  this.index = {};
  }

  insert(key, minhash) { 
    const hashbands = this.getHashbands(minhash);

    hashbands.forEach(band => {
      if (Array.isArray(this.index[band])) {
        this.index[band].push(key);
      } else {
        this.index[band] = [key];
      }
    });
  };

 query(minhash) {
    const matches = {};
    const hashbands = this.getHashbands(minhash);

    hashbands.forEach(band => {
      for (let j = 0; j < this.index[band].length; j++) {
        matches[this.index[band][j]] = true;
      }
    });

    return Object.keys(matches);
  };

  getHashbands(minhash) {
    if (minhash.hashbands) return minhash.hashbands;
    minhash.hashbands = [];
    for (let i = 0; i < minhash.hashvalues.length / this.bandSize; i++) {
      const start = i * this.bandSize;
      const end = start + this.bandSize;
      const band = minhash.hashvalues.slice(start, end);
      minhash.hashbands.push(band.join('.'));
    }
    return minhash.hashbands;
  };
};

export default LshIndex;
