import { connect } from 'react-redux';
import TableToolBar from '../../components/CoursesTable/TableToolBar';
import { reqeustAddTag, requestRemoveTag, deleteCourse } from '../../actions/ControlCourses';
import { enqueueSnackbar } from '../../actions/Notifier';

const mapStateToProps = state => {
  const numSelected = Object.keys(state.Table.selected).length;
  return {
    numSelected
  };
};

const mapDispatchToProps = {
  reqeustAddTag,
  requestRemoveTag,
  deleteCourse,
  enqueueSnackbar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableToolBar);
