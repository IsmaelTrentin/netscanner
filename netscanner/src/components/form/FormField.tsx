import React, { ChangeEvent } from 'react';
import { hot } from 'react-hot-loader';

import { FieldType } from '../../enums/FieldType';
import { IField } from './../../interfaces/IField';

/**
 * The FormField component's props.
 * 
 * @author Ismael Trentin
 * @version 2020.12.03
 */
export interface IFormFieldProps {

  /**
   * The field object.
   */
  field: IField<FieldType>;

  /**
   * The tab index number, relative to the form.
   */
  tabIndex: number;

  /**
   * Called when the field changes.
   */
  onChange: Function;
}

/**
 * A field component. Is used the Form component.
 * 
 * @author Ismael Trentin
 * @version 2020.12.03
 */
class FormField extends React.Component<IFormFieldProps> {

  /**
   * Instantiates a new FormField component.
   * 
   * @param props the component's props
   */
  constructor(props: IFormFieldProps) {
    super(props);
    this.state = {
      value: undefined
    }
    if (this.props.field.type === FieldType.RANGE) {
      this.state = {
        value: {
          start: undefined,
          end: undefined
        }
      };
    }
  }

  /**
   * Updates a `SIMPLE` field's value. 
   * 
   * @param e the event data
   * @param field the field that changed
   */
  private updateSimpleValue(e: ChangeEvent<HTMLInputElement>, field: IField<FieldType>): void {
    let oldState: any = Object.assign({}, this.state);
    oldState.value = e.target.value
    this.setState(oldState, () => {
      this.props.onChange(field, this.state);
    });
  }

  /**
   * Updates a `RANGE` field's value.
   * 
   * @param e the event data
   * @param field the field that changed
   * @param index the index of the actual field in the range, either start or end
   */
  private updateRangeValue(e: ChangeEvent<HTMLInputElement>, field: IField<FieldType>, index: number): void {
    let oldState: any = Object.assign({}, this.state);
    if (index === 0) {
      oldState.value.start = e.target.value
    } else {
      oldState.value.end = e.target.value
    }
    this.setState(oldState, () => {
      this.props.onChange(field, this.state);
    });
  }

  render() {
    let classname: string = (this.props.field.span == "span")
      ? 'field-input-spanned' :
      (this.props.field.span == "big")
        ? 'field-input-spanned-big' : 'field-input';
    classname += (this.props.field.optional) ? ' field-input-optional' : ' field-input-mandatory';
    if (this.props.field.type !== FieldType.RANGE) {
      return (
        <div className="form-field">
          <p className="field-name">{this.props.field.name}</p>
          <input
            tabIndex={this.props.tabIndex}
            type={this.props.field.inputType || 'text'}
            min="0"
            className={classname}
            placeholder={this.props.field.placeholder || this.props.field.name}
            onChange={(e) => this.updateSimpleValue(e, this.props.field)}
          />
        </div>
      );
    } else {
      return (
        <div className="form-field">
          <p className="field-name">{this.props.field.name}</p>
          <input
            tabIndex={this.props.tabIndex + 1}
            type={this.props.field.inputType || 'text'}
            min="0"
            className={classname}
            placeholder={this.props.field.placeholder + ' end'}
            onChange={(e) => this.updateRangeValue(e, this.props.field, 1)}
          />
          <input
            tabIndex={this.props.tabIndex}
            type={this.props.field.inputType || 'text'}
            min="0"
            className={classname}
            placeholder={this.props.field.placeholder + ' start'}
            onChange={(e) => this.updateRangeValue(e, this.props.field, 0)}
          />
        </div>
      );
    }
  }
}

export default hot(module)(FormField);