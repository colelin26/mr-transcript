import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ChecklistCard from '../../components/GraduationCheck/ChecklistCard';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  }
});

const CoursesTable = ({ classes }) => (
  <Paper className={classes.root}>
    <ChecklistCard />
  </Paper>
);

export default connect(
  null,
  null
)(withStyles(styles)(CoursesTable));
