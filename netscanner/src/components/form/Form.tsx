import * as React from 'react';
import { hot } from 'react-hot-loader';

class Form extends React.Component<Array<IField>> {

  constructor(props: Array<IField>) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className="form">
        {Array.from(this.props).map((f: IField) => {
          <FormField name={f.name} type={f.type} placeholder={f.placeholder} />
        })}
      </div>
    );
  }

}

class FormField extends React.Component<IField> {
  constructor(props: IField) {
    super(props);
  }

  render() {
    if (this.props.type !== IFieldType.RANGE) {
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
          <p className="field-input">{this.props.placeholder} start</p>
          <p className="field-input">{this.props.placeholder} end</p>
        </div>
      );
    }
  }
}

export interface IField {
  name: string;
  type?: IFieldType
  placeholder?: string;
}

export enum IFieldType {
  SIMPLE,
  RANGE
}

export default hot(module)(Form);