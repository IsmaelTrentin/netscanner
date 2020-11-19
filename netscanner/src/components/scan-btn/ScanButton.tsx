import React from 'react';
import { hot } from 'react-hot-loader';

class ScanButton extends React.Component<{ onClick: Function }> {

  constructor(props: { onClick: Function }) {
    super(props);
  }

  onClick = () => {
    this.props.onClick();
  }

  render() {
    return (
      <div className="scan-btn-wrapper" onClick={this.onClick}>
        <p className="scan-btn">Scan</p>
      </div>
    );
  }
}

export default hot(module)(ScanButton);