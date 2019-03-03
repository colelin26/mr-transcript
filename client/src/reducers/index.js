import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import PDFInfo from './PDFInfo';
import Table from './CourseTable';
import HomePage from './HomePage';
import Status from './Status';
import notifications from './notifications';
import GraduationCheck from './GraduationCheck';

export default combineReducers({
  PDFInfo,
  Table,
  HomePage,
  Status,
  notifications,
  form: formReducer,
  GraduationCheck
});
