import { FieldType } from '../enums/FieldType';

export interface IField {
  name: string;
  type?: FieldType
  placeholder?: string;
}