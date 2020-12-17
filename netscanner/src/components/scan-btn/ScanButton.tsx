import React from 'react';
import { hot } from 'react-hot-loader';

/**
 * The ScanButton component's props.
 * 
 * @author Ismael Trentin
 * @version 2020.12.17
 */
export interface IScanButtonProps {

  /**
   * Called when the button in clicked.
   */
  onClick: Function;
}

/**
 * The scan button component. It lights up when overed, cool!.
 * 
 * @author Ismael Trentin
 * @version 2020.12.17
 */
class ScanButton extends React.Component<IScanButtonProps> {

  /**
   * Instantiates a new ScanButton component.
   * 
   * @param props the component's props
   */
  constructor(props: IScanButtonProps) {
    super(props);
  }

  /**
   * Called when the button is clicked.
   */
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