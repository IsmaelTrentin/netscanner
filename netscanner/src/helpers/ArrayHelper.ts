export class ArrayHelper {

  public static toString<T extends Array<any>>(array: T ): string {
    let out: string = '[';
    array.forEach((v: any) => {
      out += v + ', ';
    });
    out = out.substring(0, out.length - 2);
    return out + ']';
  }

  public static toStringNoWrap<T extends Array<any>>(array: T ): string {
    let out: string = '';
    array.forEach((v: any) => {
      out += v + ', ';
    });
    out = out.substring(0, out.length - 2);
    return out;
  }
}