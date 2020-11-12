const SPLIT_CHAR: string = ',';
//const RANGE_SPLIT: string = '-';
//const RANGE_START: string = '[';
//const RANGE_END: string = ']'
//const EXCLUDE_CHAR: string = '\\';

export class Parser {

  private static cleanSplit(expression: string): Array<string> {
    expression = expression.replace(/\s/g, '');
    return expression.split(SPLIT_CHAR);
  }

  private static isRange(expression: string): boolean {
    let rangeTest: RegExp = /^\\{0,1}\[[0-9]{1,5}-[0-9]{1,5}\]$/;
    return rangeTest.test(expression);
  }

  private static isPort(expression: string): boolean {
    let portTest: RegExp = /^\\{0,1}[0-9]{1,5}$/;
    return portTest.test(expression);
  }

  private static isValid(expression: string): boolean {
    if (expression.trim() !== '') {
      expression = expression.replace(/\s/g, '')
      if (expression.includes(SPLIT_CHAR)) {
        let splitted: Array<string> = Parser.cleanSplit(expression);
        for (let i: number = 0; i < splitted.length; i++) {
          let s: string = splitted[i];
          if (!Parser.isPort(s) && !Parser.isRange(s)) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  }

  public static parse(expression: string): Array<number> {
    if (Parser.isValid(expression)) {
      let out: Array<number> = [];
      let splitted: Array<string> = Parser.cleanSplit(expression);
      for (let i: number = 0; i < splitted.length; i++) {
        let s: string = splitted[i];
        if (Parser.isRange(s)) {

        } else if (Parser.isPort(s)) {

        }
      }
      return [];
    } else {
      throw 'Invalid pattern';
    }
  }
}