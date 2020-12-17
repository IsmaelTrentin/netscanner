import * as ping from 'ping';

import { IMachine } from '../interfaces/IMachine';
import { INetOptions } from '../interfaces/INetOptions';
import * as Constants from './../helpers/Constants';
import { IScanResult } from './../interfaces/IScanResult';
import { IP } from './IP';

/**
 * Used to ping IPs.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export class Pinger {

  /**
   * Pings a specific host.
   * 
   * @param host the host to be pinged
   * @param options the optional network options
   */
  public static async ping(host: IP, options?: INetOptions): Promise<IScanResult> {
    return new Promise<IScanResult>((resolve, reject) => {
      ping.promise.probe(host.toString(), {
        timeout: (options) ? options.timeout / 1000.0 : Constants.DEFAULT_TIMEOUT / 1000.0
      }).then((r: ping.PingResponse) => {
        let machine: IMachine = {
          online: r.alive,
          ip: new IP(r.numeric_host),
          hostname: r.host,
          openPorts: []
        };
        let time: number = parseInt(r.time as string);
        let result: IScanResult = {
          machine: machine,
          pingTime: (isNaN(time)) ? undefined : time
        }
        resolve(result);
        return;
      }).catch((err: any) => reject(err));
    });
  }
}