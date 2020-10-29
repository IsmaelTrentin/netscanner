import * as React from 'react';
import { hot } from 'react-hot-loader';
import Descriptor from './components/descriptor/Descriptor';
import TopNav from './components/top-nav/TopNav';
import Form, { IField, IFieldType } from './components/form/Form';

const fields: Array<IField> = [
  {name: "Subnets range", type: IFieldType.RANGE, placeholder: "Subnet"}
];

const App = () =>
  <div>
    <TopNav />
      <Descriptor text={"Detect connected machines and open ports on networks"} />
    <Form {...fields}/>
  </div>;

export default hot(module)(App);