import * as React from 'react';
import { hot } from 'react-hot-loader';

/**
 * The ExpandButton component's props.
 * 
 * @author Ismael Trentin
 * @version 2020.12.03
 */
export interface ExpandButtonProps {

  /**
   * Called when the button is clicked.
   */
  onClick: Function;

  /**
   * The text contained in the button.
   */
  text: string;
}

/**
 * A simple button used for displaying additional
 * parameters to be passed in the scan page.
 * 
 * @author Ismael Trentin
 * @version 2020.12.03
 */
class ExpandButton extends React.Component<ExpandButtonProps>{

  /**
   * Instantiates a new ExpandButton component.
   * 
   * @param props the component's props
   */
  constructor(props: ExpandButtonProps) {
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
      <div
        className="expand-btn"
        onClick={this.onClick} >
        <p className="expand-btn-text">{this.props.text}</p>
      </div>
    );
  }
}

export default hot(module)(ExpandButton);