import { updateItemInArray } from '../../utils/helper';
import { createCourse, percentageToFPO } from '../../utils/GPACalculator';
import {
  DELETE_COURSE,
  ADD_TAG,
  REMOVE_TAG,
  ADD_COURSE,
  RESTORE_CHANGES,
  LOAD_COURSE_INFO,
  TOGGLE_TAG
} from '../../actions/ControlCourses';
import { SORTING_ORDERS } from '../../actions/CourseTable';

const initialTableState = {
  currentData: [],
  orderBy: 'id',
  order: SORTING_ORDERS.ASC,
  selected: {},
  tagMap: {
    hasGrade: { color: 'primary', content: 'grade available' },
    InAvg: { color: 'primary', content: 'in average' },
    notInAvg: { color: 'secondary', content: 'not in avg' }
  }
};

export const ControlCourses = (TableState = initialTableState, action) => {
  let { currentData, selected } = TableState;
  const { BackupData } = TableState;
  let course = action.course;
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
      if (course.percentage_grade) course.percentage_grade = +course.percentage_grade;
      else course.percentage_grade = '';
      if (course.auto_fpo) course.fpo_scale = percentageToFPO(course.percentage_grade);
      else if (course.fpo_scale) course.fpo_scale = +course.fpo_scale;
      delete course.auto_fpo;
      return { ...TableState, currentData: [...currentData, createCourse(course)] };
    case LOAD_COURSE_INFO:
      currentData = updateItemInArray(currentData, Number(course.id), item => {
        item.description = action.info.description;
        item.url = action.info.url;
        item.course_name = action.info.title;
        return item;
      });
      return {
        ...TableState,
        currentData
      };
    case RESTORE_CHANGES:
      return {
        ...initialTableState,
        currentData: BackupData,
        BackupData: BackupData.map(obj => ({
          ...obj,
          tag: Object.assign({}, obj.tag)
        }))
      };
    case TOGGLE_TAG:
      currentData = updateItemInArray(currentData, Number(action.id), item => {
        if (action.tag === 'InAvg') {
          delete item.tag[action.tag];
          item.tag = Object.assign({}, { ...item.tag, notInAvg: true });
        } else if (action.tag === 'notInAvg') {
          delete item.tag[action.tag];
          item.tag = Object.assign({}, { ...item.tag, InAvg: true });
        }
        return item;
      });
      return {
        ...TableState,
        currentData
      };
    default:
      return TableState;
  }
};
