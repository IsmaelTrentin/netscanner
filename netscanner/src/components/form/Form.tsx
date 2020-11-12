import * as React from 'react';
import { hot } from 'react-hot-loader';
import { IField } from './../../interfaces/IField';
import FormField from './FormField';

class Form extends React.Component<{ fields: Array<IField> }> {

  constructor(props: { fields: Array<IField> }) {
    super(props);
  }

  render() {
    return (
      <div className="form">
        {Array.from(this.props.fields).map((f, i) => {
          return <FormField key={i} name={f.name} placeholder={f.placeholder} type={f.type} />
        })}
      </div>
    );
  }

}

export default hot(module)(Form);