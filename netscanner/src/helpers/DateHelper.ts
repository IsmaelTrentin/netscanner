/**
 * Simple date helper.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export default class DateHelper {

  /**
   * Returns a string with day, month and year separated by `separator`.
   * 
   * @param separator the character used for separating the numbers
   * @returns a string with day, month and year separated by `separator`.
   */
  public static getDDMMYY(separator?: string): string {
    let date: Date = new Date();
    let d: number = date.getDay();
    let m: number = date.getMonth();
    let y: number = date.getFullYear();
    let sep: string = (separator) ? separator : '-';
    return `${d}${sep}${m}${sep}${y}`;
  }

  /**
   * Returns a string with hours, minutes and seconds separated by `separator`.
   * 
   * @param separator the character used for separating the numbers
   * @returns a string with hours, minutes and seconds separated by `separator`.
   */
  public static getHHMMSS(separator?: string): string {
    let date: Date = new Date();
    let h: number = date.getHours();
    let m: number = date.getMinutes();
    let s: number = date.getSeconds();
    let sep: string = (separator) ? separator : ':';
    return `${h}${sep}${m}${sep}${s}`;
  }

  /**
   * Returns a string with the default format for the filename.
   * 
   * @param ext the file extension
   * @returns a string with the default format for the filename.
   */
  public static createFileName(ext: string): string {
    return `scanreport_${DateHelper.getDDMMYY()}_${DateHelper.getHHMMSS('_')}.${ext}`;
  }
}