import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Redirect } from 'react-router-dom';

import Descriptor from '../descriptor/Descriptor';
import ExpandButton from '../expand-btn/ExpandButton';
import Form from '../form/Form';
import ScanButton from '../scan-btn/ScanButton';
import TopNav from '../top-nav/TopNav';
import { FieldType } from './../../enums/FieldType';
import FieldsHelper from './../../helpers/FieldsHelper';
import { OptionsDefaults } from './../../helpers/OptionsDefaults';
import { FieldRangeValue, IField } from './../../interfaces/IField';
import { INetOptions } from './../../interfaces/INetOptions';
import { IReportOptions } from './../../interfaces/IReportOptions';
import { IP } from './../../models/IP';
import { Parser } from './../../models/Parser';
import { Range } from './../../models/Range';

const FIELDS: Array<IField<FieldType>> = [
  {
    name: 'Subnets range:',
    type: FieldType.RANGE,
    inputType: 'text',
    placeholder: 'Subnet'
  },
  {
    name: 'Specific IPs:',
    type: FieldType.SIMPLE,
    inputType: 'text',
    placeholder: 'IPs (split with , )',
    span: "span"
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
    placeholder: 'Port',
    optional: true
  },
  {
    name: 'Specific ports:',
    type: FieldType.SIMPLE,
    inputType: 'text',
    placeholder: 'Ports (split with , )',
    span: "span",
    optional: true
  },
  {
    name: 'Exclude ports:',
    type: FieldType.SIMPLE,
    inputType: 'text',
    placeholder: 'Ports (split with , )',
    span: "span",
    optional: true
  }
];

const EXP_FIELD: IField<FieldType> = {
  name: 'Expression: (overrides ports range)',
  placeholder: 'More informations in the About page',
  inputType: "text",
  span: "big",
  type: FieldType.SIMPLE,
  optional: true
}

const REPORT_OPTIONS_FIELDS: Array<IField<FieldType>> = [
  {
    name: 'File name:',
    inputType: 'text',
    span: 'span',
    type: FieldType.SIMPLE
  },
  {
    name: 'Path:',
    inputType: 'text',
    type: FieldType.SIMPLE,
    span: 'big'
  },
  {
    name: 'Hide offlines:',
    inputType: 'text',
    type: FieldType.SIMPLE,
    span: 'none'
  },
  {
    name: 'Total time:',
    inputType: 'text',
    type: FieldType.SIMPLE,
    span: 'none'
  },
  {
    name: 'Each ping time:',
    inputType: 'text',
    type: FieldType.SIMPLE,
    span: 'none'
  },
  {
    name: 'Show hostnames:',
    inputType: 'text',
    type: FieldType.SIMPLE,
    span: 'none'
  },
  {
    name: 'All:',
    inputType: 'text',
    type: FieldType.SIMPLE,
    span: 'none'
  }
]

const NET_OPTIONS_FIELDS: Array<IField<FieldType>> = [
  {
    name: 'Timeout:',
    placeholder: 'Milliseconds',
    inputType: 'number',
    type: FieldType.SIMPLE,
    span: 'span',
    optional: true
  },
  {
    name: 'Tries:',
    placeholder: 'Number of tries',
    inputType: 'number',
    type: FieldType.SIMPLE,
    span: 'span',
    optional: true
  },
  {
    name: 'Size:',
    placeholder: 'bytes',
    inputType: 'number',
    type: FieldType.SIMPLE,
    span: 'span',
    optional: true
  },
  {
    name: 'Max hops:',
    placeholder: 'Number of hops',
    inputType: 'number',
    type: FieldType.SIMPLE,
    span: 'span',
    optional: true
  }
];

/**
 * The ScanPage state.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
export interface IScanPageState {

  /**
   * The form fields.
   */
  fields: Array<IField<FieldType>>;

  /**
   * The network options form fields.
   */
  netOptsFields: Array<IField<FieldType>>;

  /**
   * The report options form fields.
   */
  reportOptsFields: Array<IField<FieldType>>;

  /**
   * The port expression form field.
   */
  expField: IField<FieldType>;

  /**
   * Defines when to display the last error occured.
   */
  displayErr: boolean;

  /**
   * Defines if the port expression form has to be displayed.
   */
  displayExp: boolean;

  /**
   * Defines if the network options form has to be displayed.
   */
  displayNetOptions: boolean;

  /**
   * Defines if the report options form has to be displayed.
   */
  displayReportOptions: boolean;

  /**
   * The last error message.
   */
  errors: string;

  /**
   * The start ip address from where to build the IPs range.
   */
  subnetsStart: IP | undefined;

  /**
   * The end ip from where to build the IPs range.
   */
  subnetsEnd: IP | undefined;

  /**
   * The ports that will be scanned.
   */
  ports: Array<number> | undefined;

  /**
   * The expression cache. Does not work.
   */
  expCache: string;

  /**
   * The network options.
   */
  netOptions: INetOptions;

  /**
   * The report options.
   */
  reportOptions: IReportOptions;

  /**
   * Defines if the user has pressed the scan button 
   * to start a scan.
   */
  startedScan: boolean;
}

/**
 * The main page of the software.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
class ScanPage extends React.Component<{}, IScanPageState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      fields: FIELDS,
      netOptsFields: NET_OPTIONS_FIELDS,
      reportOptsFields: REPORT_OPTIONS_FIELDS,
      expField: EXP_FIELD,
      displayErr: false,
      displayExp: false,
      displayNetOptions: false,
      displayReportOptions: false,
      errors: '',
      ports: undefined,
      subnetsEnd: undefined,
      subnetsStart: undefined,
      expCache: '',
      netOptions: OptionsDefaults.NET_OPTIONS_DEFAULT,
      reportOptions: OptionsDefaults.REPORT_OPTIONS_DEFAULT,
      startedScan: false
    };
  }

  /**
   * Updates the field `field` that is `fields`.
   * 
   * @param field the field that needs to be updated
   * @param fields the fields from wich to update the field.
   */
  private updateField(field: IField<FieldType>, fields: Array<IField<FieldType>>): void {
    let index: number = FieldsHelper.indexOfByName(fields, field);
    if (index > -1) {
      fields[index] = field;
      this.setState(this.state);
      return;
    }
    throw 'Unexisting field';
  }

  /**
   * Returns true when the mandatory fields are filled in.
   */
  private areFieldsFilledIn(): boolean {
    let value1: FieldRangeValue = this.state.fields[0].value as FieldRangeValue;
    let value2: string | FieldRangeValue = this.state.fields[1].value;
    try {
      return (value1 != undefined) || (value2 != undefined && value2 != '');
      // && (this.state.fields[3].value != undefined) || (this.state.fields[4].value != undefined);
    } catch {
      return false;
    }
  }

  /**
   * Called when a main form's field changes.
   * 
   * @param field the field that changed
   * @param value the new value
   */
  onFieldChange = (field: IField<FieldType>, value: string | FieldRangeValue) => {
    field.value = value;
    this.updateField(field, this.state.fields);
  }

  /**
   * Called when a network options form's field changes.
   * 
   * @param field the field that changed
   * @param value the new value
   */
  onNetFieldChange = (field: IField<FieldType>, value: string) => {
    field.value = value;
    this.updateField(field, this.state.netOptsFields);
  }

  /**
   * Called when a report form's field changes.
   * 
   * @param field the field that changed
   * @param value the new value
   */
  onReportFieldChange = (field: IField<FieldType>, value: string) => {
    field.value = value;
    this.updateField(field, this.state.reportOptsFields);
  }

  /**
   * Called when the expression field changes.
   * 
   * @param field the port expression field
   * @param value the new value
   */
  onExpFieldChange = (field: IField<FieldType>, value: string) => {
    try {
      let ports: Array<number> = Parser.parse(value);
      this.setState({
        displayErr: false,
        errors: '',
        ports: ports,
        expField: field
      });
    } catch (error) {
      this.setState({
        displayErr: true,
        errors: error,
        expField: field
      });
    }
    if (value.trim() == '' || value == undefined) {
      this.setState({
        displayErr: false,
        errors: '',
        expField: field
      });
      return;
    }
  }

  /**
   * Called when the network options form's expand button
   * is clicked.
   */
  onNetOptionsBtnClick = () => {
    this.setState({ displayNetOptions: !this.state.displayNetOptions });
  }

  /**
   * Called when the report options form's expand button
   * is clicked.
   */
  onReportExpBtnClick = () => {
    this.setState({ displayReportOptions: !this.state.displayReportOptions });
  }

  /**
   * Called when the port expression's expand button is clicked.
   */
  onExpBtnClick = () => {
    this.setState({ displayExp: !this.state.displayExp });
  }

  /**
   * Returns the array of IPs to be scanned or `undefined` 
   * if fields are empty or invalid.
   * 
   * @returns the array of IPs to be scanned or `undefined` 
   * if fields are empty or invalid.
   */
  private getIPs(): IP[] | undefined {
    // Validate IPs
    let subsRange: FieldRangeValue = this.state.fields[0].value as FieldRangeValue;
    let singleIP: IP;
    let subnetsStart: IP;
    let subnetsEnd: IP;
    if (subsRange) {
      if (IP.isValid(subsRange.start) && IP.isValid(subsRange.end)) {
        subnetsStart = new IP(subsRange.start);
        subnetsEnd = new IP(subsRange.end);
        return [subnetsStart, subnetsEnd];
      }
    }
    if (IP.isValid(this.state.fields[1].value as string)) {
      singleIP = new IP(this.state.fields[1].value as string);
    } else {
      this.setState({
        displayErr: true,
        errors: 'Invalid subnets range or IP'
      });
      return undefined;
    }
    return (singleIP) ? [singleIP] : [subnetsStart, subnetsEnd];
  }

  /**
   * Returns the array of ports to be scanned or `undefined` 
   * if fields are empty or invalid.
   * 
   * @returns the array of ports to be scanned or `undefined` 
   * if fields are empty or invalid.
   */
  private getPorts(): number[] | undefined {
    // Validate ports
    let portsRange: FieldRangeValue = this.state.fields[3].value as FieldRangeValue;
    let validPorts: number[] = [];
    if (portsRange) {
      if (parseInt(portsRange.start) <= 0 || parseInt(portsRange.end) <= 0) {
        this.setState({
          displayErr: true,
          errors: 'Invalid port range. Cannot go below zero'
        });
        return undefined;
      } else if (portsRange.end < portsRange.start) {
        this.setState({
          displayErr: true,
          errors: 'Invalid port range. Start cannot be longer than end'
        });
        return undefined;
      }
      validPorts = Range.from(parseInt(portsRange.start), parseInt(portsRange.end));
    }
    return validPorts;
  }

  /**
   * Returns the new netOpts object by setting
   * only the values changed by the user. This will
   * work with new fields only if they are rendered 
   * in the same order as of the properties of the
   * `INetOptions` interface.
   * 
   * @returns the new netOpts object by setting
   * only the values changed by the user. This will
   * work with new fields only if they are rendered 
   * in the same order as of the properties of the
   * `INetOptions` interface.
   */
  private getNetOpts(): INetOptions {
    let values: Array<number | undefined> = [];
    // By using a loop, it will also work with new fields
    for (let v of this.state.netOptsFields) {
      let value: any = parseInt(v.value as string);
      if (isNaN(value)) {
        values.push(undefined);
      } else {
        values.push(value);
      }
    }
    // Keep default value set in state
    let opts: INetOptions = Object.assign({}, this.state.netOptions);
    let keys: string[] = Object.keys(opts);
    let i: number = 0;
    for (let k of keys) {
      if (values[i] !== undefined) {
        opts[k] = values[i];
      }
      i++;
    }
    return opts;
  }

  private getReportOpts(): IReportOptions {
    return;
  }

  /**
   * Called when the scan button is pressed.
   */
  onScanStart = () => {
    console.log(this.state);
    this.setState({
      displayErr: false,
      errors: ''
    });
    // Check mandatory fields are filled in
    let err: string = this.areFieldsFilledIn() ? '' : 'Empty fields. At least one IP is needed';
    if (err != '') {
      this.setState({ displayErr: true, errors: err });
      return;
    }
    // Get IP range or single IP
    let ips: IP[] = this.getIPs();
    if (ips == undefined) {
      return;
    }
    // Get ports
    let validPorts: number[] = this.getPorts();
    if (validPorts == undefined) {
      return;
    }
    // Get net options
    let netOpts: INetOptions = this.getNetOpts();
    // Get report options
    // no time omg

    this.setState({
      subnetsStart: ips[0],
      subnetsEnd: (ips.length == 2) ? ips[1] : ips[0],
      ports: validPorts
    });
    this.setState({
      startedScan: true
    });
  }

  render() {
    if (this.state.startedScan) {
      return (
        <Redirect to={
          {
            pathname: '/scan',
            state: {
              subnetsStart: this.state.subnetsStart,
              subnetsEnd: this.state.subnetsEnd,
              ports: this.state.ports,
              netOpts: this.state.netOptions,
              reportOpts: this.state.reportOptions,
              hasStartedScan: this.state.startedScan
            }
          }}
        />
      );
    }
    let cln: string = (this.state.displayErr) ? 'form-error' : 'hidden';
    EXP_FIELD.value = this.state.expCache;
    let expForm = (this.state.displayExp)
      ? <Form fields={[EXP_FIELD]} onChangeField={this.onExpFieldChange} />
      : '';
    let reportForm = (this.state.displayReportOptions)
      ? <Form fields={REPORT_OPTIONS_FIELDS} onChangeField={this.onReportFieldChange} />
      : '';
    let netOptsForm = (this.state.displayNetOptions)
      ? <Form fields={NET_OPTIONS_FIELDS} onChangeField={this.onNetFieldChange} />
      : '';
    return (
      <div className="app-content">
        <TopNav />
        <Descriptor text={"Detect connected machines and open ports on networks"} />
        <Form
          fields={FIELDS}
          onChangeField={this.onFieldChange}
        />
        <ExpandButton
          onClick={() => { this.onNetOptionsBtnClick() }}
          text='Scan options'
        />
        {netOptsForm}
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