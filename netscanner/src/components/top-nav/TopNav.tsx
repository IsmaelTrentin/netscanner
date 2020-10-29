import * as React from 'react';
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
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
      </div>
    );
  }
}

export default hot(module)(TopNav);