import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import { connect } from 'react-redux';
// component and container hybrid
import { handleDrawerOpen, drawerWidth } from '../../actions/HomePage';

const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  }
});

const UnstyledAppBar = ({ classes, title, open, handleDrawerOpen }) => (
  <AppBar
    position="fixed"
    className={classNames(classes.appBar, {
      [classes.appBarShift]: open
    })}
  >
    <Toolbar disableGutters={!open}>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={handleDrawerOpen}
        className={classNames(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" noWrap>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

UnstyledAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  title: state.HomePage.title,
  open: state.HomePage.UI.drawerOpen
});

const mapDispatchToProps = {
  handleDrawerOpen
};

const StyledAppBar = withStyles(styles)(UnstyledAppBar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledAppBar);
