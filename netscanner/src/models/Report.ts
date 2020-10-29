import { ScanResult } from './../interfaces/ScanResult';

export class Report {

  fields: Array<ScanResult>;

  private onlineMachines: number;

  private averagePingTime: number;

  private averagePortScanTime: number;

  private mostOpenPorts: number;

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

  private calcMostOpenPorts(): number {
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
    return [...output.entries()].reduce((a, e) => e[1] > a[1] ? e : a)[0];
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
}