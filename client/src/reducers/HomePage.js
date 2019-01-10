import { TOGGLE_DRAWER, TOGGLE_ABOUT } from '../actions/HomePage';

const HomePage = (
  state = {
    title: 'WA-Transcript',
    UI: {
      drawerOpen: false,
      aboutOpen: false
    }
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return { ...state, UI: { ...state.UI, drawerOpen: !state.UI.drawerOpen } };
    case TOGGLE_ABOUT:
      return { ...state, UI: { ...state.UI, aboutOpen: !state.UI.aboutOpen } };
    default:
      return state;
  }
};

export default HomePage;
