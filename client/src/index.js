import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import rootReducer from './reducers';
import { UPLOAD_MESSAGES } from './actions/UploadPage';
import { SORTING_ORDERS } from './actions/CourseTable';
import CSPlan from './assets/Study Plan/BCS_2017-2018.json';
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
    passedGroup: [],
    orderBy: 'id',
    order: SORTING_ORDERS.ASC,
    selected: {},
    tagMap: {
      hasGrade: { color: 'primary', content: 'grade available' },
      InAvg: { color: 'primary', content: 'in average' },
      notInAvg: { color: 'secondary', content: 'not in avg' }
    }
  },
  HomePage: {
    title: 'WA-Transcript',
    UI: {
      drawerOpen: false,
      aboutOpen: false
    }
  },
  GraduationCheck: {
    groups: CSPlan
  },
  Status: {
    fpo_avg: 'not available'
  }
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
