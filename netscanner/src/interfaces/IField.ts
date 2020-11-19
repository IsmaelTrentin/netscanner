import { FieldType } from '../enums/FieldType';

export interface IField {

  name: string;
  
  type?: FieldType;
  
  inputType?: 'text' | 'number';
  
  placeholder?: string;

  span?: boolean;

  value?: string | { start: number | undefined, end: number | undefined };
}