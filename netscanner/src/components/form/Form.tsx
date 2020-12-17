import * as React from 'react';
import { hot } from 'react-hot-loader';

import { FieldType } from './../../enums/FieldType';
import { IField } from './../../interfaces/IField';
import FormField from './FormField';

/**
 * The Form component's props.
 * 
 * @author Ismael Trentin
 * @version 2020.12.03
 */
export interface IFormProps {

  /**
   * The form fields.
   */
  fields: IField<FieldType>[];

  /**
   * Called when a field changes value.
   */
  onChangeField: Function;
}

/**
 * A simple form component.
 * 
 * @author Ismael Trentin
 * @version 2020.12.03
 */
class Form extends React.Component<IFormProps> {

  /**
   * Instantiates a new Form component.
   * 
   * @param props the component's props
   */
  constructor(props: IFormProps) {
    super(props);
  }

  /**
   * Called when a field has changed.
   * 
   * @param field the field that changed
   * @param value its new value
   */
  onChange = (field: IField<FieldType>, value: PseudoFieldValue) => {
    this.props.onChangeField(field, value.value);
  }

  render() {
    let index: number = 0;
    let inc: number = 0;
    return (
      <div className="form">
        {Array.from(this.props.fields).map((f, i) => {
          index = i + inc;
          inc = 1;
          return <FormField
            key={i}
            field={f}
            onChange={this.onChange}
            tabIndex={index}
          />
        })}
      </div>
    );
  }
}

export type PseudoFieldValue = { value: string } | { value: { start: number | undefined, end: number | undefined } };

export default hot(module)(Form);