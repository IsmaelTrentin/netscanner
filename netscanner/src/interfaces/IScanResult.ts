import { IMachine } from './IMachine';

/**
 * Defines a scan result data.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export interface IScanResult {

  /**
   * The machine that was scanned.
   */
  machine: IMachine;

  /**
   * The ping time if the machine is reachable.S
   */
  pingTime: number | undefined;
}