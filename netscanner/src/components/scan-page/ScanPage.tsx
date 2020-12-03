import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Pinger } from './../../models/Pinger';
import Descriptor from '../descriptor/Descriptor';
import ExpandButton from '../expand-btn/ExpandButton';
import Form from '../form/Form';
import ScanButton from '../scan-btn/ScanButton';
import TopNav from '../top-nav/TopNav';
import { FieldType } from './../../enums/FieldType';
import { FieldRangeValue, IField } from './../../interfaces/IField';
import { IP } from './../../models/IP';
import { Parser } from './../../models/Parser';
import { Range } from './../../models/Range';
import { IMachine } from './../../interfaces/IMachine';

const fields: Array<IField<FieldType>> = [
  {
    name: 'Subnets range:',
    type: FieldType.RANGE,
    inputType: 'text',
    placeholder: 'Subnet',
    value: {
      start: '1.1.1.1',
      end: '1.1.1.1'
    }
  },
  {
    name: 'Specific IPs:',
    type: FieldType.SIMPLE,
    inputType: 'text',
    placeholder: 'IPs (split with , )',
    span: "span",
    optional: true
  },
  {
    name: 'Exclude IPs:',
    type: FieldType.SIMPLE,
    inputType: 'text',
    placeholder: 'IPs (split with , )',
    span: "span",
    optional: true
  },
  {
    name: 'Ports range:',
    type: FieldType.RANGE,
    inputType: 'number',
    placeholder: 'Port'
  },
  {
    name: 'Specific ports:',
    type: FieldType.SIMPLE,
    inputType: 'text',
    placeholder: 'Ports (split with , )',
    span: "span",
    optional: true
  }
];

let expField: IField<FieldType> = {
  name: 'Expression',
  inputType: "text",
  span: "big",
  type: FieldType.SIMPLE,
  optional: true
}

let reportFields: Array<IField<FieldType>> = [
  {
    name: 'File name:',
    inputType: "text",
    span: "big",
    type: FieldType.SIMPLE,
    value: (new Date()).toTimeString()
  }
]

export interface ScanPageState {
  displayErr: boolean;
  displayExp: boolean;
  displayReport: boolean;
  errors: string;
  subnetsStart: IP | undefined;
  subnetsEnd: IP | undefined;
  ports: Array<number> | undefined;
  expCache: string;
}

class ScanPage extends React.Component<{}, ScanPageState> {

  constructor() {
    super({});
    this.state = {
      displayErr: false,
      displayExp: false,
      displayReport: false,
      errors: '',
      ports: undefined,
      subnetsEnd: undefined,
      subnetsStart: undefined,
      expCache: ''
    };
  }

  onFieldChange = (field: IField<FieldType>, value: string | FieldRangeValue) => {
    let index: number = -1;
    for (let f of fields) {
      if (f.name === field.name) {
        f.value = value;
        return;
      }
      index++;
    }
  }

  onExpBtnClick = () => {
    let newState: ScanPageState = this.state;
    newState.displayExp = !newState.displayExp;
    this.setState(newState);
  }

  onReportExpBtnClick = () => {
    let newState: ScanPageState = this.state;
    newState.displayReport = !newState.displayReport;
    this.setState(newState);
  }

  onExpFieldChange = (field: IField<FieldType>, value: string) => {
    try {
      let ports: Array<number> = Parser.parse(value);
      this.setState({
        displayErr: false,
        errors: '',
        ports: ports
      });
    } catch (error) {
      this.setState({
        displayErr: true,
        errors: error
      });
    }
    if (value.trim() == '' || value == undefined) {
      this.setState({
        displayErr: false,
        errors: ''
      });
      return;
    }
  }

  onReportFieldChange(field: IField<FieldType>, value: string) {
    // set report opts state
  }

  onScanStart = () => {
    this.setState({
      displayErr: false,
      errors: ''
    });
    // Check empty fields.
    for (let f of fields) {
      if (!f.optional || f.optional === undefined) {
        if (f.value === undefined) {
          this.setState({
            displayErr: true,
            errors: 'Empty fields'
          });
          return;
        }
      }
    }
    // Validate IPs
    let subsRange: FieldRangeValue =
      fields[0].value as FieldRangeValue;
    let subnetsStart: IP;
    let subnetsEnd: IP;
    if (IP.isValid('' + subsRange.start) && IP.isValid('' + subsRange.end)) {
      subnetsStart = new IP(subsRange.start);
      subnetsEnd = new IP(subsRange.end);
    } else {
      this.setState({
        displayErr: true,
        errors: 'Invalid subnets range'
      }, () => { return; });
    }
    // Validate ports
    let portsRange: FieldRangeValue = fields[3].value as FieldRangeValue;
    if (parseInt(portsRange.start) <= 0 || parseInt(portsRange.end) <= 0) {
      this.setState({
        displayErr: true,
        errors: 'Invalid port range. Cannot go below zero'
      });
    } else if (portsRange.end < portsRange.start) {
      this.setState({
        displayErr: true,
        errors: 'Invalid port range. Start cannot be longer than end'
      });
    }
    let validPorts: Array<number> = Range.from(parseInt(portsRange.start), parseInt(portsRange.end));
    this.setState({
      subnetsStart: subnetsStart,
      subnetsEnd: subnetsEnd,
      ports: validPorts
    }, () => {
      Pinger.ping(this.state.subnetsStart)
        .then((m: IMachine) => {
          console.log(m);
        });
    });
  }

  render() {
    let cln: string = (this.state.displayErr) ? 'form-error' : 'hidden';
    expField.value = this.state.expCache;
    let expForm = (this.state.displayExp)
      ? <Form fields={[expField]} onChangeField={this.onExpFieldChange} />
      : '';
    let reportForm = (this.state.displayReport)
      ? <Form fields={reportFields} onChangeField={this.onReportFieldChange} />
      : '';
    return (
      <div className="app-content">
        <TopNav />
        <Descriptor text={"Detect connected machines and open ports on networks"} />
        <Form
          fields={fields}
          onChangeField={this.onFieldChange}
        />
        <ExpandButton
          onClick={() => { this.onReportExpBtnClick() }}
          text='Report options'
        />
        {reportForm}
        <ExpandButton
          onClick={() => { this.onExpBtnClick() }}
          text='+'
        />
        {expForm}
        <p className={cln}>{this.state.errors.toString().replace('[', '').replace(']', '')}</p>
        <div className="bottom-fix">
          <ScanButton onClick={this.onScanStart} />
        </div>
      </div>
    );
  }
}
export default hot(module)(ScanPage);

// async () => {
//   let t1: number = (new Date()).getTime();
//   let ip: IP = this.state.subnetsStart;
//   while (ip != this.state.subnetsEnd) {
//     let machine: IMachine = await Pinger.ping(ip, { tries: 1, timeout: 1 });
//     if (machine.online) {
//       for (let port of this.state.ports) {
//         let open: boolean = await PortScanner.isOpen(port, ip, { tries: 1, timeout: 5 });
//         if (open) {
//           if (machine.openPorts) {
//             machine.openPorts.push(port);
//           } else {
//             machine.openPorts = [port];
//           }
//         }
//       }
//     }
//     console.log(`Host ${machine.hostname}[${ip.toString()}] is: ${(machine.online) ? 'ONLINE' : 'OFFLINE'}`);
//     if (machine.openPorts) {
//       console.log(`\tOpen ports: ${machine.openPorts.toString()}`);
//     }
//     ip.addT(0, 1);
//   }
//   console.log(`Total time: ${((new Date()).getTime() - t1) / 1000} seconds`);
// }