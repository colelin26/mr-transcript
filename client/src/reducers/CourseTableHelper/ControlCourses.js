import { createReducer, updateObject, updateItemInArray } from '../../utils/helper';
import { DELETE_COURSE, ADD_TAG, REMOVE_TAG } from '../../actions/ControlCourses';

export const ControlCourses = (TableState, action) => {
  let { currentData, selected } = TableState;
  switch (action.type) {
    case REMOVE_TAG:
      for (const key in selected) {
        currentData = updateItemInArray(currentData, Number(key), item => {
          console.log('triggered');
          delete item.tag[action.tag];
          return item;
        });
      }
      selected = {};
      return { ...TableState, currentData, selected };
    case ADD_TAG:
      for (const key in selected) {
        currentData = updateItemInArray(currentData, Number(key), item => {
          item.tag[action.tag] = true;
          return item;
        });
      }
      selected = {};
      return { ...TableState, currentData, selected };
    case DELETE_COURSE:
      currentData = currentData.filter(
        course => !Object.prototype.hasOwnProperty.call(selected, course.id)
      );
      selected = {};
      return { ...TableState, currentData, selected };
    default:
      return TableState;
  }
};
