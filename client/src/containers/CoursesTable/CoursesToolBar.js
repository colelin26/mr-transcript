import { connect } from 'react-redux';
import TableToolBar from '../../components/CoursesTable/TableToolBar';
import { addTag, removeTag, deleteCourse } from '../../actions/ControlCourses';

const mapStateToProps = state => {
  const numSelected = Object.keys(state.Table.selected).length;
  return {
    numSelected
  };
};

const mapDispatchToProps = {
  addTag,
  removeTag,
  deleteCourse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableToolBar);
