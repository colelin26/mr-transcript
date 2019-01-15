import React from 'react';
import classNames from 'classnames';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Help from '@material-ui/icons/Help';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Notifier from '../Utils/Notifier';
import About from '../../containers/CoursesTable/About';

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
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
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
    flex: '1 1',
    display: 'flex',
    flexDirection: 'row'
  },
  titleName: {
    margin: 'auto 0'
  }
});

const EnhancedTableToolbar = ({
  numSelected,
  classes,
  requestAddTag,
  requestRemoveTag,
  deleteCourse,
  toggleAbout,
  requestRestoreChanges
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
        <div className={classes.title}>
          <Typography variant="h5" id="tableTitle" className={classes.titleName}>
            Course Table
          </Typography>
          <Tooltip title="See the instruction of the app">
            <IconButton aria-label="See the instruction of the app" onClick={toggleAbout}>
              <Help />
            </IconButton>
          </Tooltip>
          <About />
        </div>
      )}
    </div>
    <div className={classes.actions}>
      {numSelected === 0 ? (
        <Tooltip title="Reset all changes you have made">
          <Button variant="contained" className={classes.button} onClick={requestRestoreChanges}>
            RESTORE TO TRANSCRIPT
          </Button>
        </Tooltip>
      ) : (
        <div>
          {/* <Button
            variant="contained"
            className={classes.button}
            onClick={() => {
              requestAddTag('InAvg');
            }}
          >
            Include in Average
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => requestRemoveTag('InAvg')}
          >
            Exclude in Average
          </Button> */}
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
