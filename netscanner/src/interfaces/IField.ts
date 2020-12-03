import { FieldType } from '../enums/FieldType';

export type FieldRangeValue = { start: string | undefined, end: string | undefined };

export interface IField<T extends FieldType> {

  name: string;

  optional?: boolean;

  type?: T;

  inputType?: 'text' | 'number';

  placeholder?: string;

  span?: "none" | "span" | "big";

  value?: T extends FieldType.RANGE ? FieldRangeValue : string | undefined;
}