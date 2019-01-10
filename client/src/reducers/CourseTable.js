import { SORTING_ORDERS, SETUP_SORT, SELECT_ITEM, SELECT_ALL } from '../actions/CourseTable';
import { UPLOAD_SUCCESS } from '../actions/UploadPage';
import { ADD_COURSE, DELETE_COURSE, ADD_TAG, REMOVE_TAG } from '../actions/ControlCourses';

import { ControlCourses } from './CourseTableHelper/ControlCourses';

const Table = (
  state = {
    currentData: [],
    orderBy: 'id',
    order: SORTING_ORDERS.ASC,
    selected: {}
  },
  action
) => {
  let { order, orderBy, selected } = state;
  const numSelected = Object.keys(selected).length;
  const { currentData } = state;
  switch (action.type) {
    case SETUP_SORT:
      if (action.orderBy === orderBy) {
        if (order === SORTING_ORDERS.ASC) order = SORTING_ORDERS.DESC;
        else order = SORTING_ORDERS.ASC;
      } else {
        orderBy = action.orderBy;
        order = SORTING_ORDERS.ASC;
      }
      return Object.assign({}, state, {
        order,
        orderBy
      });
    case SELECT_ALL:
      if (numSelected !== currentData.length) {
        const newSelected = {};
        state.currentData.forEach(course => {
          newSelected[course.id] = true;
        });
        selected = newSelected;
        if (Object.keys(selected).length !== currentData.length)
          throw new Error('Expected the state to have a correct length of all current data');
      } else {
        selected = {};
      }
      return Object.assign({}, state, {
        selected
      });
    case SELECT_ITEM:
      if (selected[action.id]) {
        delete selected[action.id];
      } else {
        selected[action.id] = true;
      }
      return {
        ...state,
        selected: Object.assign({}, selected)
      };
    case UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        Transcript: action.Transcript,
        currentData: action.Transcript.courses
      });
    case ADD_TAG:
    case REMOVE_TAG:
    case DELETE_COURSE:
    case ADD_COURSE:
      return ControlCourses(state, action);
    default:
      return state;
  }
};

export default Table;
