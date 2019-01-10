export const drawerWidth = '350px';

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_ABOUT = 'TOGGLE_ABOUT';

export const handleDrawerOpen = () => ({
  type: TOGGLE_DRAWER
});

export const toggleAbout = () => ({
  type: TOGGLE_ABOUT
});
