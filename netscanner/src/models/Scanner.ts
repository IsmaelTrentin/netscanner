import { OptionsDefaults } from "./../helpers/OptionsDefaults";
import { IMachine } from "./../interfaces/IMachine";
import { INetOptions } from "./../interfaces/INetOptions";
import { IP } from "./IP";
import { Pinger } from "./Pinger";
import { PortScanner } from "./PortScanner";

export class Scanner {

  public static async scan(ipStart: IP, ipEnd?: IP, ports?: number[], options?: INetOptions): Promise<IMachine[]> {
    return new Promise<IMachine[]>((resolve, reject) => {
      let out: IMachine[] = [];
      ports = (ports) ? ports : [];
      options = (options) ? options : OptionsDefaults.NET_OPTIONS_DEFAULT;
      ipEnd = (ipEnd) ? ipEnd : ipStart;
      let ip: IP = Object.assign({}, ipStart);
      while (ip.triplets !== ipEnd.triplets) {
        Pinger.ping(ip, options)
          .then(async (m: IMachine) => {
            if (m.online) {
              for (let p of ports) {
                let openPorts: number[];
                try {
                  if (await PortScanner.isOpen(p, ipStart, options)) {
                    openPorts.push(p);
                  }
                  m.openPorts = openPorts;
                  out.push(m);
                } catch (error) {
                  reject(error);
                  return;
                }
              }
            } else {
              out.push(m);
            }
          }).catch((err) => reject(err));
        ip.addT(0, 1);
      }
      resolve(out);
      return;
    }
    );
  }
}