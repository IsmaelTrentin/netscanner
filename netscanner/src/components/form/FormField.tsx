import React, { ChangeEvent } from "react";
import { hot } from "react-hot-loader";
import { FieldType } from "../../enums/FieldType";
import { IField } from "./../../interfaces/IField";

class FormField extends React.Component<{ field: IField, onChange: Function }> {
  constructor(props: { field: IField, onChange: Function }) {
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

  private updateSimpleValue(e: ChangeEvent<HTMLInputElement>, field: IField): void {
    let oldState: any = Object.assign({}, this.state);
    oldState.value = e.target.value
    this.setState(oldState, () => {
      console.log('State: ');
      console.log(this.state)
      this.props.onChange(field, this.state);
    });
  }

  private updateRangeValue(e: ChangeEvent<HTMLInputElement>, field: IField, index: number): void {
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
    if (this.props.field.type !== FieldType.RANGE) {
      let classname: string = (this.props.field.span == "span")
        ? 'field-input-spanned' :
        (this.props.field.span == "big")
        ? 'field-input-spanned-big' : 'field-input';
      return (
        <div className="form-field">
          <p className="field-name">{this.props.field.name}</p>
          <input
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
            type={this.props.field.inputType || 'text'}
            min="0"
            className="field-input"
            placeholder={this.props.field.placeholder + ' end'}
            onChange={(e) => this.updateRangeValue(e, this.props.field, 1)}
          />
          <input
            type={this.props.field.inputType || 'text'}
            min="0"
            className="field-input"
            placeholder={this.props.field.placeholder + ' start'}
            onChange={(e) => this.updateRangeValue(e, this.props.field, 0)}
          />
        </div>
      );
    }
  }
}

export default hot(module)(FormField);