import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import AppHeader from './AppHeader';
import HomePage from '../components/HomePage';

ReactGA.initialize('UA-132075934-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => (
  <div>
    <Route path="/" component={AppHeader} />
    <Route path="/homepage/:category?" component={HomePage} />
  </div>
);

export default App;
