import { Range } from './Range';

const SPLIT_CHAR: string = ',';
const RANGE_SPLIT: string = '-';
//const RANGE_START: string = '[';
const RANGE_END: string = ']'
//const EXCLUDE_CHAR: string = '\\';

/**
 * Parses a custom expression that defines which ports to use.
 * Rulesets: 
 * `Range   -> [min-max]
 * Add     -> ,
 * Single  -> portnumber
 * Exclude -> \
 * Example: [1-10],20,\[6-10]
 * Result:  [1,2,3,4,5,20]`
 * 
 * @author Ismael Trentin
 * @version 2020.11.12
 */
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

  private static isExcluded(exp: string): boolean {
    return exp.includes('\\');
  }

  private static isValid(expression: string): boolean {
    if (expression.trim() != '') {
      expression = expression.replace(/\s/g, '')
        let splitted: Array<string> = Parser.cleanSplit(expression);
        for (let i: number = 0; i < splitted.length; i++) {
          let s: string = splitted[i];
          if (!Parser.isPort(s) && !Parser.isRange(s)) {
            return false;
          }
        }
        return true;
    }
    return false;
  }

  private static parseRange(range: string): Array<number> {
    let min: number = parseInt(range.substring(1, range.indexOf(RANGE_SPLIT)));
    let max: number = parseInt(range.substring(range.indexOf(RANGE_SPLIT) + 1, range.indexOf(RANGE_END)));
    return Range.from(min, max);
  }

  private static parseExcludedRange(exRange: string): Array<number> {
    return Parser.parseRange(exRange.substr(1));
  }

  /**
   * Returns an array containing the ports defined by the expression.
   * 
   * @param expression the expression used to define the ports
   */
  public static parse(expression: string): Array<number> {
    if (Parser.isValid(expression)) {
      let out: Array<number> = [];
      let splitted: Array<string> = Parser.cleanSplit(expression);
      for (let i: number = 0; i < splitted.length; i++) {
        let s: string = splitted[i];
        if (this.isExcluded(s)) {
          if (Parser.isRange(s)) {
            out = out.sort((a: number, b: number) => a - b);
            let range: Array<number> = Parser.parseExcludedRange(s);
            out = out.filter((v: number) => !range.includes(v));
          } else if (Parser.isPort(s)) {
            let port: number = parseInt(s.substr(1));
            out = out.filter((v: number) => v != port);
          }
        } else {
          if (Parser.isRange(s)) {
            let range: Array<number> = Parser.parseRange(s);
            out = out.concat(range);
          } else if (Parser.isPort(s)) {
            out.push(parseInt(s));
          }
        }
      }
      return out;
    } else {
      throw 'Invalid pattern';
    }
  }
}