import { IP } from "../models/IP";

export interface IMachine {

  online: boolean;

  ip: IP;

  hostname?: string;

  openPorts?: Array<number> | undefined;
}