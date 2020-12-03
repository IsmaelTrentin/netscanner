/**
 * Simple range class.
 * 
 * @author Ismael Trentin
 * @version 2020.11.12
 */
export class Range {

  /**
   * Returns an array representing the range starting from
   * `min` and ending at `max`.
   * 
   * @param min the range start
   * @param max the range end
   */
  public static from(min: number, max: number): Array<number> {
    if (min < max) {
      let array: Array<number> = [];
      for (let i = min; i <= max; i++) {
        array.push(i);
      }
      return array;
    } else {
      throw 'min cannot be greater than max';
    }
  }

  public static removeFrom(range: Array<number>, numbers: Array<number>): Array<number> {
    return range.filter((v: number) => !numbers.includes(v));
  }
}