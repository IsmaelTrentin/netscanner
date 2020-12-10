import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import App from './App';
import AboutPage from './components/about-page/AboutPage';
import ScanProgressPage from './components/scan-progess-page/ScanProgressPage';
import './index.css';

ReactDom.render(
  <HashRouter>
    <Route exact path="/" component={App} />
    <Route exact path="/scan" component={ScanProgressPage} />
    <Route exact path="/about" component={AboutPage} />
  </HashRouter>,
  document.getElementById('root')
);