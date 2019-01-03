import { makeActionCreator } from '../utils/helper';

export const ADD_COURSE = 'ADD_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG = 'REMOVE_TAG';
export const INVALID_ACTION = 'INVALID_ACTION';

export const addCourse = makeActionCreator(ADD_COURSE, 'course');
export const deleteCourse = makeActionCreator(DELETE_COURSE);
export const addTag = makeActionCreator(ADD_TAG, 'tag');
export const removeTag = makeActionCreator(REMOVE_TAG, 'tag');
export const invalidAction = makeActionCreator(INVALID_ACTION, 'msg');
