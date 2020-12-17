import * as React from 'react';
import { hot } from 'react-hot-loader';

/**
 * The Descriptor component's props.
 * 
 * @author Ismael Trentin
 * @version 2020.10.29
 */
interface IDescriptor {

  /**
   * The display text.
   */
  text: string
}

/**
 * The descriptor component. It provides a brief 
 * description to the current page.
 * 
 * @author Ismael Trentin
 * @version 2020.10.29
 */
class Descriptor extends React.Component<IDescriptor> {

  /**
   * Instantiates a new Descriptor component.
   * 
   * @param props the component's props
   */
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

export default hot(module)(Descriptor);