import * as React from 'react';
import { hot } from 'react-hot-loader';
import ScanPage from './components/scan-page/ScanPage';

class App extends React.Component {
  render() {
    return (
      <ScanPage />
    );
  }
}
export default hot(module)(App);