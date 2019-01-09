import { UPLOAD_SUCCESS } from '../actions/UploadPage';

const Status = (
  state = {
    fpo_avg: 'not defined',
    percentage_scale: 'not defined'
  },
  action
) => {
  switch (action.type) {
    case UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        fpo_avg: action.Transcript.fpo_avg
      });
    default:
      return state;
  }
};

export default Status;
