import React from 'react';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForever from '@material-ui/icons/DeleteForever';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Notifier from '../Utils/Notifier';

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap'
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten('#8bc34a', 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  actions: {
    display: 'flex',
    color: theme.palette.text.secondary,
    flex: '1 1 auto',
    flexFlow: 'row-wrap',
    justifyContent: 'flex-end'
  },
  button: {
    margin: theme.spacing.unit
  },
  title: {
    flex: '0 0 20%'
  }
});

const EnhancedTableToolbar = ({
  numSelected,
  classes,
  reqeustAddTag,
  requestRemoveTag,
  deleteCourse
}) => (
  <Toolbar
    className={classNames(classes.root, {
      [classes.highlight]: numSelected > 0
    })}
  >
    <Notifier />
    <div className={classes.title}>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle">
          Courses Table
        </Typography>
      )}
    </div>
    <div className={classes.actions}>
      {numSelected > 0 && (
        <div>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              reqeustAddTag('inavg');
            }}
          >
            Include in Average
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => requestRemoveTag('inavg')}
          >
            Exclude in Average
          </Button>
          <Tooltip title="Delete the selected course">
            <IconButton aria-label="Delete the selected course" onClick={deleteCourse}>
              <DeleteForever />
            </IconButton>
          </Tooltip>
        </div>
      )}
    </div>
  </Toolbar>
);

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

export default withStyles(toolbarStyles, { withTheme: true })(EnhancedTableToolbar);
