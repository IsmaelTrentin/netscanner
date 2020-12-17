import { IP } from '../models/IP';

/**
 * Defines an abstract machine.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export interface IMachine {

  /**
   * The machine state.
   * true if online false if offline.
   */
  online: boolean;

  /**
   * The machine IP.
   */
  ip: IP;

  /**
   * The machine open ports.k
   */
  openPorts: Array<number>;

  /**
   * The machine hostname if it has one.
   */
  hostname?: string;
}