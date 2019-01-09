import { updateItemInArray } from '../../utils/helper';
import { createCourse, percentageToFPO } from '../../utils/GPACalculator';
import { DELETE_COURSE, ADD_TAG, REMOVE_TAG, ADD_COURSE } from '../../actions/ControlCourses';

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
    case ADD_COURSE:
      let course = action.course;
      course.id = action.id;
      if (course.percentage_grade) course.percentage_grade = +course.percentage_grade;
      else course.percentage_grade = '';
      if (course.auto_fpo) course.fpo_scale = percentageToFPO(course.percentage_grade);
      else if (course.fpo_scale) course.fpo_scale = +course.fpo_scale;
      delete course.auto_fpo;
      return { ...TableState, currentData: [...currentData, createCourse(course)] };
    default:
      return TableState;
  }
};
