import { connect } from 'react-redux';
import { onSelectAllClick, createSortHandler } from '../../actions/CourseTable';
import TableHeader from '../../components/CoursesTable/TableHeader';

const mapStateToProps = state => {
  const numSelected = Object.keys(state.Table.selected).length;
  const rowCount = state.Table.currentData.length;
  return {
    order: state.Table.order,
    orderBy: state.Table.orderBy,
    numSelected,
    rowCount
  };
};

const mapDispatchToProps = {
  onSelectAllClick,
  createSortHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableHeader);
