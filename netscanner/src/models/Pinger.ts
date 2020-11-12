import { IMachine } from '../interfaces/IMachine'
import { INetOptions } from '../interfaces/INetOptions';
import { IP } from "./IP";
import * as ping from 'ping';

export class Pinger {

  public static async ping(host: IP, options?: INetOptions): Promise<IMachine> {
    return new Promise<IMachine>((resolve, reject) => {
      ping.promise.probe(host.toString(), {
        timeout: options.timeout / 1000.0
      }).then((r: ping.PingResponse) => {
        let machine: IMachine = {
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