import { IP } from "../models/IP";

export interface Machine {

  online: boolean;

  ip: IP;

  hostname?: string;

  openPorts?: Array<number> | undefined;
}