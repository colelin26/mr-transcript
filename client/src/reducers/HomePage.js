import { TOGGLE_DRAWER } from '../actions/HomePage';

const HomePage = (
  state = {
    title: 'WA-Transcript',
    UI: {
      drawerOpen: false
    }
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { ...state, UI: { ...state.UI, drawerOpen: !state.UI.drawerOpen } };
    default:
      return state;
  }
};

export default HomePage;
