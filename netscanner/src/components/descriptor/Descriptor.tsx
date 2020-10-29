import * as React from 'react';
import { hot } from 'react-hot-loader';

class Descriptor extends React.Component<IDescriptor> {

  constructor(props: IDescriptor) {
    super(props);
  }

  render() {
    return (
      <div className="descriptor">
        <p>{this.props.text}</p>
      </div>
    );
  }
}

interface IDescriptor {
  text: string
}

export default hot(module)(Descriptor);