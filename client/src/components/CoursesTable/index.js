import React from 'react';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import CourseTableBody from '../../containers/CoursesTable/CoursesTableBody';
import CourseTableHeader from '../../containers/CoursesTable/CoursesTableHeader';
import CourseToolBar from '../../containers/CoursesTable/CoursesToolBar';
import StatusCard from '../../containers/CoursesTable/StatusCard';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

const CoursesTable = ({ classes }) => (
  <Paper className={classes.root}>
    <CourseToolBar />
    <StatusCard />
    <div className={classes.tableWrapper}>
      <Table className={classes.table} aria-labelledby="CourseTable">
        <CourseTableHeader />
        <CourseTableBody />
      </Table>
    </div>
  </Paper>
);

export default withStyles(styles)(CoursesTable);
