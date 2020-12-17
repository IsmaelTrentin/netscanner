import * as React from 'react';
import { hot } from 'react-hot-loader';

import Descriptor from '../descriptor/Descriptor';
import TopNav from '../top-nav/TopNav';

/**
 * Defines the AboutPage component's props.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
interface AboutPageState {

  /**
   * The software version.
   */
  version: string;

  /**
   * The author's full name.
   */
  author: string;

  /**
   * The port expression tutorial.
   */
  expTutorial: {

    /**
     * The range example.
     */
    range: string,

    /**
     * The port example.
     */
    port: string,

    /**
     * The exclude example.
     */
    exclude: string,

    /**
     * The full example.
     */
    example: string
  };
}

/**
 * The AboutPage page component.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
class AboutPage extends React.Component<{}, AboutPageState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      author: 'Ismael Trentin',
      version: '0.1.0',
      expTutorial: {
        range: 'Range: [start - end]',
        port: 'Port: 1-65535',
        exclude: 'Exclude: \\',
        example: 'Example: [1-20], \\5, [40-50], \\[11-20]'
      }
    }
  }

  render() {
    return (
      <div className="app-content">
        <TopNav />
        <Descriptor text={"About Net Scanner"} />
        <div className="form about-form">
          <p>{this.state.author}</p>
          <p><span className="machine-data">{this.state.version}</span></p>
          <p>Running on Electron <span className="machine-data">10.1.3</span> with React <span className="machine-data">16.13.1</span></p>
          <div className="about-form-code-title">Expression tutorial:</div>
          <div className="about-form-code">
            <p>{this.state.expTutorial.range}</p>
            <p>{this.state.expTutorial.port}</p>
            <p>{this.state.expTutorial.exclude}</p>
            <p>{this.state.expTutorial.example}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(AboutPage);