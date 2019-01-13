import request from 'superagent';
import { makeActionCreator } from '../utils/helper';
import { enqueueSnackbar } from './Notifier';

export const ADD_COURSE = 'ADD_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const CONVERT_TO_FPO = 'CONVERT_TO_FPO';
export const RESTORE_CHANGES = 'RESTORE_CHANGES';
export const LOAD_COURSE_INFO = 'LOAD_COURSE_INFO';
export const TOGGLE_TAG = 'TOGGLE_TAG';

export const convertToFPO = makeActionCreator(CONVERT_TO_FPO, 'course');
export const addCourse = makeActionCreator(ADD_COURSE, 'course');
export const loadCourseInfo = makeActionCreator(LOAD_COURSE_INFO, 'course', 'info');
export const deleteCourse = makeActionCreator(DELETE_COURSE);
export const addTag = makeActionCreator(ADD_TAG, 'tag');
export const removeTag = makeActionCreator(REMOVE_TAG, 'tag');
export const restoreChanges = makeActionCreator(RESTORE_CHANGES);
export const toggleTag = makeActionCreator(TOGGLE_TAG, 'tag', 'id');

export const requestAddTag = tag => (dispatch, getState) => {
  const { selected, currentData } = getState().Table;
  if (tag === 'InAvg') {
    for (const key in selected) {
      if (
        !currentData[key].percentage_grade ||
        !currentData[key].fpo_scale ||
        !currentData[key].earned_credit
      ) {
        dispatch(
          enqueueSnackbar({
            message:
              'Courses have to contain grades and earned credits to be included in the average.',
            options: {
              variant: 'error'
            }
          })
        );
        return;
      }
    }
  }
  dispatch(addTag(tag));
  dispatch(
    enqueueSnackbar({
      message: `Successfully added the new tag.`,
      options: {
        variant: 'success'
      }
    })
  );
};

export const requestRemoveTag = tag => (dispatch, getState) => {
  dispatch(removeTag(tag));
  dispatch(
    enqueueSnackbar({
      message: 'Removed the specific tag for the selected courses',
      options: {
        variant: 'success'
      }
    })
  );
};

export const requestAddCourse = course => (dispatch, getState) => {
  course.id = getState().Table.currentData.length;
  dispatch(addCourse(course));
  dispatch(
    enqueueSnackbar({
      message: 'Successfully added the new course',
      options: {
        variant: 'success'
      }
    })
  );
  const req = request
    .get('/getCourseInfo')
    .query({ letter: course.course_letter })
    .query({ number: course.course_number });
  req.end((err, res) => {
    if (err) {
      dispatch(
        enqueueSnackbar({
          message: 'Could not link course information with UW API',
          options: {
            variant: 'warn'
          }
        })
      );
      return;
    }
    dispatch(
      enqueueSnackbar({
        message: 'Successfully linked course information',
        options: {
          variant: 'success'
        }
      })
    );
    dispatch(loadCourseInfo(course, res.body));
  });
};

export const requestRestoreChanges = () => (dispatch, getState) => {
  dispatch(restoreChanges());
  dispatch(
    enqueueSnackbar({
      message: 'Restored all the changes',
      options: {
        variant: 'success'
      }
    })
  );
};
