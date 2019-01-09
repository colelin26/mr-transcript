import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { UPLOAD_MESSAGES } from './actions/UploadPage';
import { SORTING_ORDERS } from './actions/CourseTable';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const initialState = {
  PDFInfo: {
    message: UPLOAD_MESSAGES.welcome_message,
    pdfDropped: false,
    pdfSubmitted: false,
    files: []
  },
  Table: {
    currentData: [],
    orderBy: 'id',
    order: SORTING_ORDERS.ASC,
    selected: {}
  },
  HomePage: {
    title: 'WA-Transcript',
    UI: {
      drawerOpen: false
    }
  },
  Status: {
    fpo_avg: 'not available'
  }
};

const store = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension && window.devToolsExtension()
)(createStore)(rootReducer, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
