import { connect } from 'react-redux';
import TableToolBar from '../../components/CoursesTable/TableToolBar';

const mapStateToProps = state => {
  const numSelected = Object.keys(state.Table.selected).length;
  return {
    numSelected
  };
};

export default connect(
  mapStateToProps,
  null
)(TableToolBar);
