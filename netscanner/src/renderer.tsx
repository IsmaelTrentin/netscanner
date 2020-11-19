import * as React from 'react';
import * as ReactDom from 'react-dom';
import { HashRouter, Link, Route } from 'react-router-dom';
import App from './App';
import ReportPage from './components/report-page/ReportPage';
import './index.css';

ReactDom.render(
  <HashRouter>
    <Route exact path="/" component={App} />
    <Route exact path="/report" component={ReportPage} />
  </HashRouter>,
  document.getElementById('root')
);