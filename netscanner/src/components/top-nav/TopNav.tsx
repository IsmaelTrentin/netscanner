import * as React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

class TopNav extends React.Component {
  render() {
    return (
      <div>
        <div className="top-nav">
          <p className="title">Net Scanner</p>
        </div>
        <div className="dropdown">
          <img src="" alt="X" className="dropbtn" />
          <div className="dropdown-content">
            <Link to="/">Scan</Link>
            <Link to="/report">Last Report</Link>
            <a href="#">Compact Report</a>
            <a href="#">Results</a>
            <a href="#">About</a>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(TopNav);