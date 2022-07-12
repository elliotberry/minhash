/**
 * Minhash class - generates minhash signatures for set
 **/
class Minhash {
  constructor(config={numPerm: 128, seed:1}) {
    
    // prime is the smallest prime larger than the largest
    // possible hash value (max hash = 32 bit int)
    this.prime = 4294967311;
    this.maxHash = 2 ** 32 - 1;

    // initialize the minhash
    this.numPerm = config.numPerm;
    this.seed = config.seed;
    this.hashvalues = [];
    this.permA = [];
    this.permB = [];
    // share permutation functions across all minhashes
    this.inithashvalues();
    this.initPermutations();
  }

  // initialize the hash values as the maximum value
  inithashvalues() {
    for (let i = 0; i < this.numPerm; i++) {
      this.hashvalues.push(this.maxHash);
    }
  }

  // initialize the permutation functions for a & b
  // don't reuse any integers when making the functions
  initPermutations() {
    const used = {};
    for (let i = 0; i < 2; i++) {
      const perms = [];
      for (let j = 0; j < this.numPerm; j++) {
        let int = this.randInt();
        while (used[int]) int = this.randInt();
        perms.push(int);
        used[int] = true;
      }
      const key = ['permA', 'permB'][i];
      this[key] = perms;
    }
  }

  // the update function updates internal hashvalues given user data
  update(str) {
    for (let i = 0; i < this.hashvalues.length; i++) {
      const a = this.permA[i];
      const b = this.permB[i];
      const hash = (a * this.hash(str) + b) % this.prime;
      if (hash < this.hashvalues[i]) {
        this.hashvalues[i] = hash;
      }
    }
  }

  // hash a string to a 32 bit unsigned int
  hash(str) {
    let hash = 0;
    if (str.length == 0) {
      return hash + this.maxHash;
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // convert to a 32bit integer
    }
    return hash + this.maxHash;
  }

  // estimate the jaccard similarity to another minhash
  jaccard({hashvalues, seed}) {
    if (this.hashvalues.length != hashvalues.length) {
      throw new Error('hashvalue counts differ');
    } else if (this.seed != seed) {
      throw new Error('seed values differ');
    }
    let shared = 0;
    for (let i = 0; i < this.hashvalues.length; i++) {
      shared += this.hashvalues[i] == hashvalues[i];
    }
    return shared / this.hashvalues.length;
  }

  // return a random integer >= 0 and <= maxHash
  randInt() {
    const x = Math.sin(this.seed++) * this.maxHash;
    return Math.floor((x - Math.floor(x)) * this.maxHash);
  }
}

export default Minhash;
