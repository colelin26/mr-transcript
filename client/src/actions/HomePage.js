export const drawerWidth = '350px';

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_ABOUT = 'TOGGLE_ABOUT';

export const HOME_PAGE = 'homepage';
export const COURSE_TABLE = 'coursetable';
export const GRADUATION_CHECK = 'graduation_check';
export const SCHEME_SETTING = 'setting';

export const handleDrawerOpen = () => ({
  type: TOGGLE_DRAWER
});

export const toggleAbout = () => ({
  type: TOGGLE_ABOUT
});
