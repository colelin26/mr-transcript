import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

// id should match the field name in a course to ensure the filter works
const rows = [
  {
    id: 'course_letter',
    numeric: false,
    disablePadding: true,
    label: 'Course Letter',
    description: 'English Letter alias for the subject'
  },
  {
    id: 'course_number',
    numeric: true,
    disablePadding: false,
    label: 'Course Number',
    description: 'Course Number'
  },
  {
    id: 'course_name',
    numeric: false,
    disablePadding: false,
    label: 'Course Name',
    description: 'The full name of the course'
  },
  {
    id: 'fpo_scale',
    numeric: true,
    disablePadding: false,
    label: 'Points out of 4.0',
    description: 'The grade in 4.0 scale'
  },
  {
    id: 'percentage_grade',
    numeric: true,
    disablePadding: false,
    label: 'Percentage Grade',
    description: 'The grade in percentage scale (the one on the transcript)'
  },
  {
    id: 'level',
    numeric: false,
    disablePadding: false,
    label: 'Term',
    description: 'The term when the course is taken'
  },
  {
    id: 'earned_credit',
    numeric: true,
    disablePadding: false,
    label: 'Earned Credit',
    description: 'The credit earned from the course'
  },
  {
    id: 'tag',
    numeric: false,
    disablePadding: false,
    label: 'Tagss',
    description: 'The tags the course is in, can be customized on this page'
  }
];

const styles = theme => ({
  tableHead: {
    minWidth: 1020
  }
});

const TableHeader = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  createSortHandler,
  classes
}) => (
  <TableHead className={classes.tableHead}>
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
      {rows.map(row => (
        <TableCell
          key={row.id}
          numeric={row.numeric}
          padding={row.disablePadding ? 'none' : 'default'}
          sortDirection={orderBy === row.id ? order : false}
        >
          <Tooltip title={row.description} placement="bottom-start" enterDelay={300}>
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={() => createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </Tooltip>
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default withStyles(styles)(TableHeader);
