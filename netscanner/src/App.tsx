import * as React from 'react';
import { hot } from 'react-hot-loader';

import ScanPage from './components/scan-page/ScanPage';

/** 
 * The main app.
 * 
 * @author Ismael Trentin
 * @version 2020.11.19 
 */
class App extends React.Component {
  render() {
    return (
      <ScanPage />
    );
  }
}

export default hot(module)(App);