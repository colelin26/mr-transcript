import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import PDFInfo from './PDFInfo';
import Table from './CourseTable';
import HomePage from './HomePage';
import Status from './Status';
import notifications from './notifications';

export default combineReducers({
  PDFInfo,
  Table,
  HomePage,
  Status,
  notifications,
  form: formReducer
});
