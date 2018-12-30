import { connect } from 'react-redux';
import { handleSelectItem } from '../../actions/CourseTable';
import TableBodyComponent from '../../components/CoursesTable/TableBody';

const mapStateToProps = state => ({
  currentData: state.Table.currentData,
  selected: state.Table.selected,
  order: state.Table.order,
  orderBy: state.Table.orderBy
});

const mapDispatchToProps = {
  handleSelectItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableBodyComponent);
