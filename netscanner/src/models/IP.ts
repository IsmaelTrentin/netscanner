export class IP {

  triplets: Array<number>;

  public static isValid(ip: string): boolean {
    let pattern: RegExp = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
    return pattern.test(ip);
  }

  constructor(ip: string) {
    if (IP.isValid(ip)) {
      this.triplets = ip.split('.')
        .map((v: string) => parseInt(v));
      this.triplets = this.triplets.reverse();
    } else {
      throw 'Invalid IP format';
    }
  }

  public addT(index: number, amount: number): IP {
    if (index >= 0 && index < this.triplets.length) {
      if (this.triplets[index] == 255) {
        this.addT(index + 1, 1);
        this.triplets[index] = amount - 1;
      } else {
        this.triplets[index] += amount;
      }
      return this;
    } else {
      throw 'Invalid index';
    }
  }

  public subT(index: number, amount: number): IP {
    if (index >= 0 && index < this.triplets.length) {
      if (this.triplets[index] - amount < 0) {
        this.subT(index + 1, 1);
        this.triplets[index] = 256 - (amount - this.triplets[index]);
      } else {
        this.triplets[index] -= amount;
      }
      return this;
    } else {
      throw 'Invalid index';
    }
  }

  public toString(): string {
    let str: string = '';
    for (let i = this.triplets.length - 1; i > -1; i--) {
      str += this.triplets[i] + '.';
    }
    return str.substr(0, str.length - 1);
  }
}