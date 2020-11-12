import * as React from 'react';
import { hot } from 'react-hot-loader';
import Descriptor from './components/descriptor/Descriptor';
import TopNav from './components/top-nav/TopNav';
import Form from './components/form/Form';
import { IField } from "./interfaces/IField";
import { FieldType } from "./enums/FieldType";



const fields: Array<IField> = [
  { name: "Subnets range", type: FieldType.RANGE, placeholder: "Subnet" }
];

const App = () =>
  <div className="app-content">
    <TopNav />
    <Descriptor text={"Detect connected machines and open ports on networks"} />
    <Form fields={fields} />
  </div>;

export default hot(module)(App);