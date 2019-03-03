import { UPDATE_GRADUATION_CHECK } from '../actions/GraduationCheck';

const GraduationCheck = (state = { groups: [] }, action) => {
  switch (action.type) {
    case UPDATE_GRADUATION_CHECK:
      return state;
    default:
      return state;
  }
};

export default GraduationCheck;
