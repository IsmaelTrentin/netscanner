/**
 * Defines the network options used in the scanning process.
 * 
 * @author Ismael Trentin
 * @version 2020.11.12
 */
export interface INetOptions {

  /**
   * The timeout in ms.
   */
  timeout?: number;

  /**
   * The max number of tries.
   */
  tries?: number;

  /**
   * The packet size in byets.
   */
  size?: number;

  /**
   * The max number of hops.
   */
  maxHops?: number;
}