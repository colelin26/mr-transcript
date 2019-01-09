import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import CoursesTable from '../../containers/CoursesTable';
import NavBar from '../../containers/HomePage/NavBar';
import Drawer from '../../containers/HomePage/Drawer';
import { drawerWidth } from '../../actions/HomePage';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}`
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

const HomePage = ({ classes, open }) => (
  <div className={classes.root}>
    <NavBar />
    <Drawer />
    <CssBaseline />
    <main
      className={classNames(classes.content, {
        [classes.contentShift]: open
      })}
    >
      <div className={classes.drawerHeader} />
      <CoursesTable />
    </main>
  </div>
);

const mapStateToProps = state => ({
  open: state.HomePage.UI.drawerOpen
});

const StyledHomepage = withStyles(styles)(HomePage);
export default connect(
  mapStateToProps,
  null
)(StyledHomepage);
