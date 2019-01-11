import { updateItemInArray } from '../../utils/helper';
import { createCourse, percentageToFPO } from '../../utils/GPACalculator';
import {
  DELETE_COURSE,
  ADD_TAG,
  REMOVE_TAG,
  ADD_COURSE,
  RESTORE_CHANGES
} from '../../actions/ControlCourses';
import { SORTING_ORDERS } from '../../actions/CourseTable';

const initialTableState = {
  currentData: [],
  orderBy: 'id',
  order: SORTING_ORDERS.ASC,
  selected: {},
  tagMap: {
    hasGrade: 'grade available',
    inavg: 'in average'
  }
};

export const ControlCourses = (TableState = initialTableState, action) => {
  let { currentData, selected } = TableState;
  const { BackupData } = TableState;
  switch (action.type) {
    case REMOVE_TAG:
      for (const key in selected) {
        currentData = updateItemInArray(currentData, Number(key), item => {
          delete item.tag[action.tag];
          item.tag = Object.assign({}, item.tag);
          return item;
        });
      }
      selected = {};
      return { ...TableState, currentData, selected };
    case ADD_TAG:
      for (const key in selected) {
        currentData = updateItemInArray(currentData, Number(key), item => {
          item.tag = { ...item.tag, [action.tag]: true };
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
    case RESTORE_CHANGES:
      return {
        ...initialTableState,
        currentData: BackupData,
        BackupData: BackupData.map(obj => ({
          ...obj,
          tag: Object.assign({}, obj.tag)
        }))
      };
    default:
      return TableState;
  }
};
