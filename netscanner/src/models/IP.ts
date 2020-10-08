export class IP {

  triplets: Array<number>;

  public static isValid(ip: string): boolean {
    let pattern: RegExp = /^[0-255]{1,3}\.[0-255]{1,3}\.[0-255]{1,3}\.[0-255]{1,3}$/;
    return pattern.test(ip);
  }

  constructor(ip: string) {
    if (IP.isValid(ip)) {
      this.triplets = ip.split('.')
        .map((v: string) => parseInt(v));
    } else {
      throw 'Invalid IP format';
    }
  }

  public addT(index: number, amount: number): IP {
    if (index >= 0 && index < this.triplets.length) {
      this.triplets[index] += amount;
      if (this.triplets[index] >= 256) {
        if (index < this.triplets.length) {
          this.triplets[index] = this.triplets[index] - 256;
          //this.addT(index + 1, (this.triplets[index] + 1) % 256);
          return this;
        } else {
          throw 'Out of bounds';
        }
      }
    } else {
      throw 'Invalid index';
    }
  }

  public toString(): string {
    let str: string = '';
    for (let i = this.triplets.length - 1; i > -1; i--){
      str += this.triplets[i] + '.';
    }
    return str.substr(0, str.length - 1);
  }
}