import * as React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

/**
 * The top dropdown menu component.
 * 
 * @author Ismael Trentin
 * @version 2020.12.10
 */
class TopNav extends React.Component {

  render() {
    return (
      <div>
        <div className="top-nav">
          <p className="title">Net Scanner</p>
        </div>
        <div className="dropdown">
          {/* <img src="" alt="Menu" className="dropbtn" /> */}
          <p>MENU</p>
          <div className="dropdown-content">
            <Link to="/">Scan</Link>
            <Link to="/scan">Report</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(TopNav);