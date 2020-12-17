import { FieldType } from './../enums/FieldType';
import { IField } from './../interfaces/IField';

/**
 * Simple fields helper.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export default class FieldsHelper {

  /**
   * Returns the index of the field `field` in the
   * array `fields`.
   * 
   * @param fields the fields array
   * @param field the field you want to find the index for
   */
  public static indexOfByName(fields: Array<IField<FieldType>>, field: IField<FieldType>): number {
    let i: number = 0;
    for (const f of fields) {
      if (f.name == field.name) {
        return i;
      }
      i++;
    }
    return -1;
  }
}