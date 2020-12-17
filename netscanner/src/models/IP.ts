/**
 * Abstract model of an IP address.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export class IP {

  /**
   * The IP address triplets.
   * From LSB to MSB.
   */
  triplets: Array<number>;

  /**
   * Returns true if `ip` is a valid IP address, false otherwise.
   * 
   * @param ip the string that needs to be validated
   * @returns true if `ip` is a valid IP address, false otherwise.
   */
  public static isValid(ip: string): boolean {
    let pattern: RegExp = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
    return pattern.test(ip);
  }

  /**
   * Returns the number of hosts in the range `ip1`-`ip2`.
   * 
   * @param ip1 start IP address
   * @param ip2 end IP address
   * @returns the number of hosts in the range `ip1`-`ip2`.
   */
  public static countAddresses(ip1: IP, ip2: IP): number {
    let ip: IP;
    if (ip2.triplets[3] < ip1.triplets[3]
      && ip2.triplets[2] < ip1.triplets[2]
      && ip2.triplets[1] < ip1.triplets[1]
      && ip2.triplets[0] < ip1.triplets[0]) {
      ip = new IP(ip2.toString());
    }
    ip = new IP(ip1.toString());
    let addresses: number = 0;
    while (!ip.isSame(ip2)) {
      addresses++;
      ip.addT(0, 1);
    }
    return addresses;
  }

  /**
   * Instantiates a new IP.
   * 
   * @param ip a valid a ip address
   */
  constructor(ip: string) {
    if (IP.isValid(ip)) {
      this.triplets = ip.split('.')
        .map((v: string) => parseInt(v));
      this.triplets = this.triplets.reverse();
    } else {
      throw 'Invalid IP format';
    }
  }

  /**
   * Adds `amount` to the triplet at `index`.
   * 
   * @param index the triplet index from LSB to MSB
   * @param amount the amout to be added
   * @returns the IP address.
   */
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

  /**
   * Subs `amount` to the triplet at `index`.
   * 
   * @param index the triplet index from LSB to MSB
   * @param amount the amout to be added
   * @returns the IP address.
   */
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

  /**
   * Returns true if `ip` is same as this ip, false otherwise.
   * 
   * @param ip the IP address
   * @returns true if `ip` is same as this ip, false otherwise.
   */
  public isSame(ip: IP): boolean {
    return this.toString() == ip.toString();
    //or this.triplets == ip.triplets ???
  }

  /**
   * Returns a string representation of this IP address.
   * 
   * @returns a string representation of this IP address.
   */
  public toString(): string {
    let str: string = '';
    for (let i = this.triplets.length - 1; i > -1; i--) {
      str += this.triplets[i] + '.';
    }
    return str.substr(0, str.length - 1);
  }
}