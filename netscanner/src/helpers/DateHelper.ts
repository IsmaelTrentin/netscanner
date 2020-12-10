export default class DateHelper {

  public static getDDMMYY(separator?: string): string {
    let date: Date = new Date();
    let d: number = date.getDay();
    let m: number = date.getMonth();
    let y: number = date.getFullYear();
    let sep: string = (separator) ? separator : '-';
    return `${d}${sep}${m}${sep}${y}`;
  }

  public static getHHMMSS(separator?: string): string {
    let date: Date = new Date();
    let h: number = date.getHours();
    let m: number = date.getMinutes();
    let s: number = date.getSeconds();
    let sep: string = (separator) ? separator : ':';
    return `${h}${sep}${m}${sep}${s}`;
  }

  public static createFileName(ext: string): string {
    return `scanreport_${DateHelper.getDDMMYY()}_${DateHelper.getHHMMSS('_')}.${ext}`;
  }

}