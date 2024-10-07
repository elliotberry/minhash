class Minhash {
  constructor(config = { numPerm: 128, seed: 1 }) {
    this.prime = 4_294_967_311;
    this.maxHash = 2 ** 32 - 1;

    this.numPerm = config.numPerm;
    this.seed = config.seed;
    this.hashvalues = new Array(this.numPerm).fill(this.maxHash);
    this.permA = this.initPermutations();
    this.permB = this.initPermutations();
  }

  initPermutations() {
    const perms = new Set();
    while (perms.size < this.numPerm) {
      perms.add(this.randInt());
    }
    return Array.from(perms);
  }

  update(str) {
    const hashStr = this.hash(str);
    for (let i = 0; i < this.numPerm; i++) {
      const a = this.permA[i];
      const b = this.permB[i];
      const hash = (a * hashStr + b) % this.prime;
      if (hash < this.hashvalues[i]) {
        this.hashvalues[i] = hash;
      }
    }
  }

  hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return (hash >>> 0) + this.maxHash;
  }

  jaccard({ hashvalues, seed }) {
    if (this.hashvalues.length !== hashvalues.length) {
      throw new Error('hashvalue counts differ');
    }
    if (this.seed !== seed) {
      throw new Error('seed values differ');
    }
    let shared = 0;
    for (let i = 0; i < this.hashvalues.length; i++) {
      if (this.hashvalues[i] === hashvalues[i]) {
        shared++;
      }
    }
    return shared / this.hashvalues.length;
  }

  randInt() {
    const x = Math.sin(this.seed++) * this.maxHash;
    return Math.floor((x - Math.floor(x)) * this.maxHash);
  }
}

export default Minhash;
