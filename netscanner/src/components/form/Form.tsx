import * as React from 'react';
import { hot } from 'react-hot-loader';
import { IField } from './../../interfaces/IField';
import FormField from './FormField';

class Form extends React.Component<{ fields: Array<IField>, onChangeField: Function }> {

  constructor(props: { fields: Array<IField>, onChangeField: Function }) {
    super(props);
  }

  onChange = (field: IField, value: { value: string } | { value: { start: number | undefined, end: number | undefined } }) => {
    this.props.onChangeField(field, value.value);
  }

  render() {
    return (
      <div className="form">
        {Array.from(this.props.fields).map((f, i) => {
          return <FormField
            key={i}
            field={f}
            onChange={this.onChange}
          />
        })}
      </div>
    );
  }

}

export default hot(module)(Form);