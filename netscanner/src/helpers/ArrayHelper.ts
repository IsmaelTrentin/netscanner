/**
 * Simple array helper.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export class ArrayHelper {

  /**
   * Returns a string representation of and array.
   * 
   * @param array the array
   * @returns a string representation of and array.
   */
  public static toString<T extends Array<any>>(array: T): string {
    let out: string = '[';
    array.forEach((v: any) => {
      out += v + ', ';
    });
    out = out.substring(0, out.length - 2);
    return out + ']';
  }

  /**
   * Returns a string representation of and array without 
   * start and end parenthesis.
   * 
   * @param array the array
   * @returns a string representation of and array without 
   * start and end parenthesis.
   */
  public static toStringNoWrap<T extends Array<any>>(array: T): string {
    let out: string = '';
    array.forEach((v: any) => {
      out += v + ', ';
    });
    out = out.substring(0, out.length - 2);
    return out;
  }
}