import React from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import AppHeader from './AppHeader';
import HomePage from '../components/HomePage';

ReactGA.initialize('UA-132075934-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const mapStateToProps = state => ({
  pdfSubmitted: state.PDFInfo.pdfSubmitted
});

const App = ({ pdfSubmitted }) => (
  <div>
    {!pdfSubmitted && <AppHeader />}
    {pdfSubmitted && <HomePage />}
  </div>
);

export default connect(
  mapStateToProps,
  null
)(App);
