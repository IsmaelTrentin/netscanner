import { NetOptions } from '../interfaces/NetOptions';
import { isPortReachable } from 'is-port-reachable';
import { IP } from './IP';
import { DEFAULT_TIMEOUT } from './../helpers/Constants';

export class PortScanner {

  public static async isOpen(port: number, host: IP | string, options?: NetOptions): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      host = (host instanceof IP) ? host.toString() : host;
      isPortReachable(port, { host: host, timeout: options.timeout || DEFAULT_TIMEOUT})
        .then((reached: boolean) => {
          resolve(reached);
        })
        .catch((e: any) => reject(e));
    });
  }
}