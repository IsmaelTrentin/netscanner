import * as React from 'react';
import { hot } from 'react-hot-loader';
import { FieldType } from './../../enums/FieldType';
import { IField } from './../../interfaces/IField';
import Descriptor from '../descriptor/Descriptor';
import Form from '../form/Form';
import ScanButton from '../scan-btn/ScanButton';
import TopNav from '../top-nav/TopNav';
import { IP } from './../../models/IP';

const fields: Array<IField> = [
  {
    name: 'Subnets range:',
    type: FieldType.RANGE,
    inputType: 'text',
    placeholder: 'Subnet'
  },
  {
    name: 'Exclude IPs:',
    type: FieldType.SIMPLE,
    inputType: 'text',
    placeholder: 'IPs (split with , )',
    span: true
  },
  {
    name: 'Ports range:',
    type: FieldType.RANGE,
    inputType: 'number',
    placeholder: 'Port'
  },
  {
    name: 'Exclude ports:',
    type: FieldType.SIMPLE,
    inputType: 'text',
    placeholder: 'Ports (split with , )',
    span: true
  }
];

class ScanPage extends React.Component<{}, { displayErr: boolean, errors: string }> {

  constructor() {
    super({});
    this.state = {
      displayErr: false,
      errors: ''
    };
  }


  onFieldChange = (field: IField, value: string | { start: number | undefined, end: number | undefined }) => {
    let index: number = -1;
    for (let f of fields) {
      if (f.name === field.name) {
        f.value = value;
        return;
      }
      index++;
    }
  }

  onScanStart = () => {
    this.setState({
      displayErr: false,
      errors: ''
    });
    // Check empty fields.
    for (let f of fields) {
      if (f.value === undefined) {
        this.setState({
          displayErr: true,
          errors: 'Empty fields'
        }, () => { return; });
        return;
      }
    }
    // Validate IPs
    let subsRange: { start: number | undefined, end: number | undefined } =
      fields[0].value as { start: number | undefined, end: number | undefined };
    if (IP.isValid('' + subsRange.start) && IP.isValid('' + subsRange.end)) {

    } else {
      this.setState({
        displayErr: true,
        errors: 'Invalid subnets range'
      }, () => { return; });
    }
  }

  render() {
    let cln: string = (this.state.displayErr) ? 'form-error' : 'hidden';
    return (
      <div className="app-content">
        <TopNav />
        <Descriptor text={"Detect connected machines and open ports on networks"} />
        <Form
          fields={fields}
          onChangeField={this.onFieldChange}
        />
        <p className={cln}>{this.state.errors.toString().replace('[', '').replace(']', '')}</p>
        <div className="bottom-fix">
          <ScanButton onClick={this.onScanStart} />
        </div>
      </div>
    );
  }
}
export default hot(module)(ScanPage);