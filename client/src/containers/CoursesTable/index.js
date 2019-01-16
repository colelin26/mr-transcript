import React from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import CourseTableBody from './CoursesTableBody';
import CourseTableHeader from './CoursesTableHeader';
import CourseToolBar from './CoursesToolBar';
import StatusCard from './StatusCard';
import AddCourse from './AddCourse/AddCourse';
import { requestAddCourse } from '../../actions/ControlCourses';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflow: 'auto',
    maxHeight: '53vh'
  }
});

const CoursesTable = ({ classes, requestAddCourse }) => (
  <Paper className={classes.root}>
    <div>
      <CourseToolBar />
      <StatusCard />
      <AddCourse
        onSubmit={values => {
          requestAddCourse(values);
        }}
      />
    </div>
    <div className={classes.tableWrapper}>
      <Table className={classes.table} aria-labelledby="CourseTable">
        <CourseTableHeader />
        <CourseTableBody />
      </Table>
    </div>
  </Paper>
);

const mapDispatchToProps = {
  requestAddCourse
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(CoursesTable));
