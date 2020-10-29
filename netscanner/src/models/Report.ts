import { ScanResult } from './../interfaces/ScanResult';

export class Report {

  fields: Array<ScanResult>;

  private onlineMachines: number;

  private averagePingTime: number;

  private averagePortScanTime: number;

  private mostOpenPorts: Map<number, number>;

  constructor(fields: Array<ScanResult>) {
    this.fields = fields;
    this.fields.forEach((sr: ScanResult) => {
      if (sr.machine.online) {
        this.onlineMachines++;
      }
      this.averagePingTime += sr.pingTime;
      this.averagePortScanTime += sr.portScanTime;
    });
    this.averagePingTime /= this.fields.length;
    this.averagePortScanTime /= this.fields.length;
    this.mostOpenPorts = this.calcMostOpenPorts();
  }

  private calcMostOpenPorts(): Map<number, number> {
    let output: Map<number, number> = new Map();
    this.fields.forEach((sr: ScanResult) => {
      if (sr.machine.online) {
        sr.machine.openPorts.forEach((p: number) => {
          if (!output.has(p)) {
            output.set(p, 1);
          } else {
            output.set(p, output.get(p) + 1);
          }
        });
      }
    });
    //return [...output.entries()].reduce((a, e) => e[1] > a[1] ? e : a)[0];
    let size: number = (output.size < 4) ? output.size : 4;
    let ks: Array<number> = Array.from(output.keys()).slice(0, size);
    let vs: Array<number> = Array.from(output.values()).slice(0, size);
    output = new Map<number, number>();
    ks.forEach((k: number, i: number) => {
      output.set(k, vs[i]);
    })
    return output;
  }

  public getOnlineMachines(): number {
    return this.onlineMachines;
  }

  public getAveragePingTime(): number {
    return this.averagePingTime;
  }

  public getAveragePortScanTime(): number {
    return this.averagePortScanTime;
  }

  public getMostOpenPorts(): Map<number, number> {
    return this.mostOpenPorts;
  }
}