import { IMachine } from "./IMachine";

export interface IScanResult {

  machine: IMachine;

  pingTime: number | undefined;
}