import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';

import { handleDrawerOpen, drawerWidth } from '../../actions/HomePage';

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  }
});

const AppDrawer = ({ classes, theme, open, handleDrawerOpen }) => (
  <Drawer
    className={classes.drawer}
    variant="persistent"
    anchor="left"
    open={open}
    classes={{
      paper: classes.drawerPaper
    }}
  >
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleDrawerOpen}>
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>
      <ListItem button key={0}>
        <ListItemText primary="Courses Table" />
      </ListItem>
      <ListItem button key={1}>
        <ListItemText primary="GPA Converter Schema" />
      </ListItem>
      <ListItem button key={2}>
        <ListItemText primary="Graduation Requirement Check" />
      </ListItem>
      <ListItem button key={3}>
        <ListItemText primary="Export Data" />
      </ListItem>
    </List>
  </Drawer>
);

const mapStateToProps = state => ({
  open: state.HomePage.UI.drawerOpen
});

const mapDispatchToProps = {
  handleDrawerOpen
};

const StyledDrawer = withStyles(styles, { withTheme: true })(AppDrawer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledDrawer);
