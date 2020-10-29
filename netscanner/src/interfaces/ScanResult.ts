import { Machine } from "./Machine";

export interface ScanResult {

  machine: Machine;

  pingTime: number;

  portScanTime: number;
}