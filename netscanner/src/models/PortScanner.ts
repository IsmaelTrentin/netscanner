import { INetOptions } from '../interfaces/INetOptions';
import ipr from 'is-port-reachable';
import { IP } from './IP';
import { DEFAULT_TIMEOUT } from './../helpers/Constants';
import { Pinger } from './Pinger';

export class PortScanner {

  public static async isOpen(port: number, host: IP | string, options?: INetOptions): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      host = (host instanceof IP) ? host.toString() : host;
      let tout: number = (options) ? options.timeout : DEFAULT_TIMEOUT;
      ipr(port, { host: host, timeout: tout})
        .then((reached: boolean) => {
          resolve(reached);
          return;
        })
        .catch((e: any) => reject(e));
    });
  }
}