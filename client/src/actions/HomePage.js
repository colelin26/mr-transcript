export const drawerWidth = '350px';

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const TOGGLE_ABOUT = 'TOGGLE_ABOUT';

export const HOME_PAGE = 'homepage';
export const COURSE_TABLE = 'coursetable';
export const SCHEME_SETTING = 'setting';
export const GRADUATION_REQUIREMENT = 'gradrequirement';
export const EXPORT_DATA = 'exportdata';

export const handleDrawerOpen = () => ({
  type: TOGGLE_DRAWER
});

export const toggleAbout = () => ({
  type: TOGGLE_ABOUT
});
