/**
 * Defines the report options.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export interface IReportOptions {

  /**
   * The file name.
   */
  fileName?: string;

  /**
   * The file path.
   */
  filePath?: string;

  /**
   * Defines if only online machine should be displayed.
   * true display all, false display only online machines.
   */
  hideOffline?: boolean;

  /**
   * Defines if the total time should be displayed.
   * true yes false no.
   */
  totalTime?: boolean;

  /**
   * Defines if the ping time of each machine should be
   * displayed. true yes false no.
   */
  pingTime?: boolean;

  /**
   * Defines if the hostname of each machine should
   * be displayed. true yes false no.
   */
  hostnames?: boolean;

  /**
   * Uses all the options as true.
   */
  all?: boolean | undefined;
}