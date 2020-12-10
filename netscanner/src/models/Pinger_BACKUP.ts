import { IMachine } from '../interfaces/IMachine'
import { INetOptions } from '../interfaces/INetOptions';
import { IP } from "./IP";
import * as ping from 'ping';
import * as Constants from '../helpers/Constants';

export class Pinger {

  public static async ping(host: IP, options?: INetOptions): Promise<IMachine> {
    return new Promise<IMachine>((resolve, reject) => {
      ping.promise.probe(host.toString(), {
        timeout: (options) ? options.timeout / 1000.0 : Constants.DEFAULT_TIMEOUT / 1000.0
      }).then((r: ping.PingResponse) => {
        let machine: IMachine = {
          online: r.alive,
          ip: new IP(r.numeric_host),
          hostname: r.host,
          openPorts: []
        };
        resolve(machine);
        return;
      }).catch((err: any) => reject(err));
    });
  }

  // public static async pingRange(ipStart: IP, ipEnd: IP, options?: INetOptions): Promise<IMachine[]> {
  //   return new Promise<IMachine[]>(async (resolve, reject) => {
  //     let results: Array<IMachine> = [];
  //     while (ipStart.triplets != ipEnd.triplets) {
  //       results.push(await Pinger.ping(ipStart, options));
  //       ipStart.addT(0, 1);
  //     }
  //     return results;
  //   });
  // }
}