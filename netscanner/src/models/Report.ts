import fs from 'fs';
import path from 'path';

import { ArrayHelper } from './../helpers/ArrayHelper';
import DateHelper from './../helpers/DateHelper';
import { IReportOptions } from './../interfaces/IReportOptions';
import { IScanResult } from './../interfaces/IScanResult';

/**
 * Report model.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export class Report {

  /**
   * The report fields.
   */
  readonly fields: Array<IScanResult>;

  /**
   * The report options.
   */
  readonly options: IReportOptions;

  /**
   * The number of online machines.
   */
  private onlineMachines: number;

  /**
   * The average ping time for each ping.
   */
  private averagePingTime: number;

  /**
   * The most common open ports.
   */
  private mostOpenPorts: Map<number, number>;

  /**
   * Instatiates a new Report.
   * 
   * @param fields the report fields
   * @param options the report options
   */
  constructor(fields: Array<IScanResult>, options: IReportOptions) {
    this.fields = fields;
    this.options = options;
    this.fields.forEach((sr: IScanResult) => {
      if (sr.machine.online) {
        this.onlineMachines++;
      }
      // Since it's a simple operation,
      // the avg ping is calculated even
      // if is not required in the report.
      if (sr.pingTime) {
        this.averagePingTime += sr.pingTime;
      }
    });
    this.averagePingTime /= this.onlineMachines;
    this.mostOpenPorts = this.calcMostOpenPorts();
  }

  /**
   * Returns a map with the count of occurences for each
   * opened port.
   */
  private calcMostOpenPorts(): Map<number, number> {
    let output: Map<number, number> = new Map();
    this.fields.forEach((sr: IScanResult) => {
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

  /**
   * Converts the report into a csv format.
   * 
   * @returns the report in a csv file.
   */
  private toCSV(): string {
    let headers: string[] = ['IP', 'State', 'Open ports:'];
    let data: string[][] = [[]];
    if (this.options.hostnames) {
      headers.push('Hostname');
    }
    if (this.options.pingTime) {
      headers.push('Ping time (ms)');
    }
    let i: number = 0;
    for (let sr of this.fields) {
      let ip: string = sr.machine.ip.toString();
      let state: string = (sr.machine.online) ? 'online' : 'offline';
      let ports: string = (sr.machine.openPorts.length > 0) ? ArrayHelper.toStringNoWrap(sr.machine.openPorts) : 'none';
      data[i] = [ip, state, ports];
      if (this.options.hostnames) {
        data[i].push(sr.machine.hostname);
      }
      if (this.options.pingTime) {
        if (sr.pingTime) {
          data[i].push(sr.pingTime.toFixed(4));
        } else {
          data[i].push('-');
        }
      }
      i++;
    }
    let strData: string = ArrayHelper.toStringNoWrap(headers) + '\n';
    for (let index = 1; index < data.length; index++) {
      strData += ArrayHelper.toStringNoWrap(data[index]) + '\n';
    }
    return strData;
  }

  /**
   * Returns the number of online machines.
   * 
   * @returns the number of online machines
   */
  public getOnlineMachines(): number {
    return this.onlineMachines;
  }

  /**
   * Returns the average ping time.
   * 
   * @returns the average ping time.
   */
  public getAveragePingTime(): number {
    return this.averagePingTime;
  }

  /** 
   * Returns the most common opened ports.
   * 
   * @returns a map with the most common opened ports.
   */
  public getMostOpenPorts(): Map<number, number> {
    return this.mostOpenPorts;
  }

  /** 
   * Writes the file to the default file path. 
   */
  public async write(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.options.fileName = DateHelper.createFileName('csv');
      let fPath: string = path.join(this.options.filePath, this.options.fileName);
      fs.mkdir(this.options.filePath, (err) => {
        if (err && err.code != 'EEXIST') {
          reject(err);
          return;
        }
        fs.writeFile(fPath, this.toCSV(), (err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
          return;
        });
      });
    });
  }
}