import * as React from 'react';
import { hot } from 'react-hot-loader';
import { FieldType } from './../../enums/FieldType';
import { IField } from './../../interfaces/IField';
import FormField from './FormField';

class Form extends React.Component<{ fields: Array<IField<FieldType>>, onChangeField: Function }> {

  constructor(props: { fields: Array<IField<FieldType>>, onChangeField: Function }) {
    super(props);
  }

  onChange = (field: IField<FieldType>, value: { value: string } | { value: { start: number | undefined, end: number | undefined } }) => {
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

export default hot(module)(Form);