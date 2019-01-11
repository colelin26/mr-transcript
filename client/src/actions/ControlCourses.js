import { makeActionCreator } from '../utils/helper';
import { enqueueSnackbar } from './Notifier';

export const ADD_COURSE = 'ADD_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const CONVERT_TO_FPO = 'CONVERT_TO_FPO';
export const RESTORE_CHANGES = 'RESTORE_CHANGES';

export const convertToFPO = makeActionCreator(CONVERT_TO_FPO, 'course');
export const addCourse = makeActionCreator(ADD_COURSE, 'course');
export const deleteCourse = makeActionCreator(DELETE_COURSE);
export const addTag = makeActionCreator(ADD_TAG, 'tag', 'id');
export const removeTag = makeActionCreator(REMOVE_TAG, 'tag', 'id');
export const restoreChanges = makeActionCreator(RESTORE_CHANGES);

export const requestAddTag = tag => (dispatch, getState) => {
  const { selected, currentData } = getState().Table;
  if (tag === 'inavg') {
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
  dispatch(addCourse(course));
  dispatch(
    enqueueSnackbar({
      message: 'Successfully added the new course',
      options: {
        variant: 'success'
      }
    })
  );
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
