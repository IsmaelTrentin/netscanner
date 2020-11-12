export class Range {

  public static create(min: number, max: number): Array<number> {
    if (min < max) {
      let array: Array<number> = [];
      for (let i = min; i <= max; i++) {
        array.push(min + 1);
      }
      return array;
    } else {
      throw 'min cannot be greater than max';
    }
  }
}