import React from "react";
import { hot } from "react-hot-loader";
import { IField } from "./../../interfaces/IField";
import { FieldType } from "../../enums/FieldType";

class FormField extends React.Component<IField> {
  constructor(props: IField) {
    super(props);
  }

  render() {
    if (this.props.type !== FieldType.RANGE) {
      return (
        <div className="form-field">
          <p className="field-name">{this.props.name}</p>
          <p className="field-input">{this.props.placeholder || this.props.name}</p>
        </div>
      );
    } else {
      return (
        <div className="form-field-range">
          <p className="field-name">{this.props.name}</p>
          <input type="text" className="field-input" placeholder={this.props.placeholder + ' start'} />
          <input type="text" className="field-input" placeholder={this.props.placeholder + ' end'}/>
        </div>
      );
    }
  }
}

export default hot(module)(FormField);