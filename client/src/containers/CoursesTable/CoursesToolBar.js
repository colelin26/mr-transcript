import { connect } from 'react-redux';
import TableToolBar from '../../components/CoursesTable/TableToolBar';
import { requestAddTag, requestRemoveTag, deleteCourse } from '../../actions/ControlCourses';
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
  deleteCourse,
  enqueueSnackbar,
  toggleAbout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableToolBar);
