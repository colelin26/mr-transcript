import { connect } from 'react-redux';
import TableToolBar from '../../components/CoursesTable/TableToolBar';
import {
  requestAddTag,
  requestRemoveTag,
  requestDeleteCourse,
  requestRestoreChanges
} from '../../actions/ControlCourses';
import { toggleAbout } from '../../actions/HomePage';
import { enqueueSnackbar } from '../../actions/Notifier';

const mapStateToProps = state => {
  const numSelected = Object.keys(state.Table.selected).length;
  return {
    numSelected
  };
};

const mapDispatchToProps = {
  requestAddTag,
  requestRemoveTag,
  requestDeleteCourse,
  enqueueSnackbar,
  toggleAbout,
  requestRestoreChanges
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableToolBar);
