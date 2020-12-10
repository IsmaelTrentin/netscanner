import { IP } from "../models/IP";

export interface IMachine {

  online: boolean;

  ip: IP;

  openPorts: Array<number>;

  hostname?: string;
}