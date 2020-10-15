import { Machine } from '../interfaces/Machine'
import { NetOptions } from '../interfaces/NetOptions';

export class PortScanner {

  public static async isOpen(ports: Array<number>, options?: NetOptions): Promise<Machine> {
    return new Promise<Machine>((resolve, reject) => {

    });
  }
}