import { ENQUEUE_SNACKBAR, REMOVE_SNACKBAR } from '../actions/Notifier';

const notifications = (state = [], action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return [
        ...state,
        {
          ...action.notification
        }
      ];
    case REMOVE_SNACKBAR:
      return state.filter(notification => notification.key !== action.key);
    default:
      return state;
  }
};

export default notifications;
