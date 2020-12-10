import { FieldType } from './../enums/FieldType';
import { IField } from './../interfaces/IField';

export default class FieldsHelper {

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