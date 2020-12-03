import * as React from 'react';
import { hot } from 'react-hot-loader';

export interface ExpandButtonProps {
  onClick: Function;
  text: string;
}

class ExpandButton extends React.Component<ExpandButtonProps>{

  constructor(props: ExpandButtonProps) {
    super(props);
  }

  onClick = () => {
    this.props.onClick();
  }

  render() {
    return (
      <div
        className="expand-btn"
        onClick={this.onClick} >
        <p className="expand-btn-text">{this.props.text}</p>
      </div>
    );
  }
}

export default hot(module)(ExpandButton);