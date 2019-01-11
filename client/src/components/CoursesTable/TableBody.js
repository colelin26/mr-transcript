import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { SORTING_ORDERS } from '../../actions/CourseTable';
import TagButton from './TagButton';

const styles = theme => ({
  tableBody: {
    minWidth: 1020
  },
  link: {
    margin: theme.spacing.unit
  }
});

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) =>
  order === SORTING_ORDERS.DESC ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);

const TableBodyComponent = ({
  classes,
  currentData,
  selected,
  handleSelectItem,
  order,
  orderBy
}) => (
  <TableBody className={classes.tableBody}>
    {stableSort(currentData, getSorting(order, orderBy)).map(n => {
      const isSelected = selected.hasOwnProperty(n.id);
      return (
        <TableRow hover aria-checked={isSelected} tabIndex={-1} key={n.id} selected={isSelected}>
          <TableCell padding="checkbox">
            <Checkbox checked={isSelected} onChange={() => handleSelectItem(n.id)} />
          </TableCell>
          <TableCell component="th" scope="row" padding="none">
            {n.course_letter}
          </TableCell>
          <TableCell>{n.course_number}</TableCell>
          <Tooltip title={n.description}>
            <TableCell>
              <Link href={n.url} className={classes.link} target="_blank" rel="noopener">
                {n.course_name}
              </Link>
            </TableCell>
          </Tooltip>
          <TableCell numeric>{n.fpo_scale}</TableCell>
          <TableCell numeric>{n.percentage_grade}</TableCell>
          <TableCell>{n.level}</TableCell>
          <TableCell numeric>{n.earned_credit}</TableCell>
          <TableCell>
            <TagButton tags={n.tag} />
          </TableCell>
        </TableRow>
      );
    })}
  </TableBody>
);

export default withStyles(styles)(TableBodyComponent);
