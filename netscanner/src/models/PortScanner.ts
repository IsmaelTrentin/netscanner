import { NetOptions } from '../interfaces/NetOptions';
import ipr from 'is-port-reachable';
import { IP } from './IP';
import { DEFAULT_TIMEOUT } from './../helpers/Constants';

export class PortScanner {

  public static async isOpen(port: number, host: IP | string, options?: NetOptions): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      host = (host instanceof IP) ? host.toString() : host;
      let tout: number = (options) ? options.timeout : DEFAULT_TIMEOUT;
      ipr(port, { host: host, timeout: tout})
        .then((reached: boolean) => {
          resolve(reached);
        })
        .catch((e: any) => reject(e));
    });
  }
}