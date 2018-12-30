import React from 'react';
import { connect } from 'react-redux';
import AppHeader from '../containers/AppHeader';
import HomePage from './HomePage';

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
