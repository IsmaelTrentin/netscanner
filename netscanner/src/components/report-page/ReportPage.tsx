import * as React from 'react';
import * as ReactDom from 'react-dom';
import { hot } from 'react-hot-loader';
import TopNav from '../top-nav/TopNav';

class ReportPage extends React.Component {

  render() {
    return (
      <div className="app-content">
        <TopNav />
        <h2>Report PAGE</h2>
      </div>
    );
  }
}

export default hot(module)(ReportPage);