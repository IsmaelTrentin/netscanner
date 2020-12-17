import { FieldType } from '../enums/FieldType';

export type FieldRangeValue = { start: string | undefined, end: string | undefined };

/**
 * Defines a form field.
 * 
 * @author Ismael Trentin
 * @version 2020.12.03
 */
export interface IField<T extends FieldType> {

  /**
   * The field name.
   */
  name: string;

  /**
   * Defines if the field is optional or not.
   * This alters the style.
   */
  optional?: boolean;

  /**
   * The type of the field.
   */
  type?: T;

  /**
   * The data type of the field.
   */
  inputType?: 'text' | 'number';

  /**
   * The field placeholder.
   */
  placeholder?: string;

  /**
   * Defines the span amount of the fields.
   */
  span?: "none" | "span" | "big";

  /**
   * The field value.
   */
  value?: T extends FieldType.RANGE ? FieldRangeValue : string | undefined;
}