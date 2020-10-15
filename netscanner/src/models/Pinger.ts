import { Machine } from '../interfaces/Machine'
import { NetOptions } from '../interfaces/NetOptions';
import { IP } from "./IP";
import * as ping from 'ping';

export class Pinger {

  public static async ping(host: IP, options?: NetOptions): Promise<Machine> {
    return new Promise<Machine>((resolve, reject) => {
      ping.promise.probe(host.toString(), {
        timeout: options.timeout
      }).then((r: ping.PingResponse) => {
        let machine: Machine = {
          online: r.alive,
          ip: host,
          hostname: r.host
        };
        resolve(machine);
        return;
      }).catch((err: any) => reject(err));
    });
  }
}