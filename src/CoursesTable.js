import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

function SimpleTable(props) {
  console.log(props.rows);
  const { classes, rows} = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell numeric>id</TableCell>
            <TableCell>Course Letter</TableCell>
            <TableCell>Course Number</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell numeric>FPO scale</TableCell>
            <TableCell numeric>Percentage Grade</TableCell>
            <TableCell>Taken Term</TableCell>
            <TableCell>Course Load</TableCell>
            <TableCell>Form of Study</TableCell>
            <TableCell numeric>Attempted Credit</TableCell>
            <TableCell numeric>Earned Credit</TableCell>
            <TableCell>Tag</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell numeric>{row.id}</TableCell>
                <TableCell>{row.course_letter}</TableCell>
                <TableCell>{row.course_number}</TableCell>
                <TableCell component="th" scope="row">
                  {row.course_name}
                </TableCell>
                <TableCell numeric>{row.fpo_scale}</TableCell>
                <TableCell numeric>{row.percentage_grade}</TableCell>
                <TableCell>{row.level}</TableCell>
                <TableCell>{row.course_load}</TableCell>
                <TableCell>{row.form_of_study}</TableCell>
                <TableCell numeric>{row.attempted_credit}</TableCell>
                <TableCell numeric>{row.earned_credit}</TableCell>
                <TableCell>On Hold</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
