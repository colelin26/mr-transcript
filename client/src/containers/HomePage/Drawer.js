import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {
  handleDrawerOpen,
  drawerWidth,
  HOME_PAGE,
  COURSE_TABLE,
  SCHEME_SETTING,
  GRADUATION_REQUIREMENT,
  EXPORT_DATA
} from '../../actions/HomePage';

import { requestExportCSV, requestExportJSON } from '../../actions/FileExport';

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

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataExport: {
        anchorEl: null
      }
    };
    this.handleDataExportClick = this.handleDataExportClick.bind(this);
    this.handleDataExportClose = this.handleDataExportClose.bind(this);
  }

  handleDataExportClick = event => {
    this.setState({ DataExport: { anchorEl: event.currentTarget } });
  };

  handleDataExportClose = event => {
    this.setState({ DataExport: { anchorEl: null } });
  };

  render() {
    const {
      classes,
      theme,
      open,
      handleDrawerOpen,
      requestExportCSV,
      requestExportJSON
    } = this.props;
    const { anchorEl } = this.state.DataExport;

    return (
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
          <ListItem component={Link} to={`/${HOME_PAGE}/${COURSE_TABLE}`} button key={0}>
            <ListItemText primary="Course Table" />
          </ListItem>
          <ListItem
            button
            key={1}
            component="a"
            target="_blank"
            rel="noopener"
            href="https://www.ouac.on.ca/guide/omsas-conversion-table"
          >
            <ListItemText primary="GPA Converter Schema" />
          </ListItem>
          <ListItem button key={2}>
            <ListItemText primary="Graduation Requirement Check" />
          </ListItem>
          <ListItem button key={3}>
            <ListItemText primary="Export Data" onClick={this.handleDataExportClick} />
          </ListItem>
        </List>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleDataExportClose}>
          <MenuItem onClick={requestExportCSV}>Export to CSV</MenuItem>
          <MenuItem onClick={requestExportJSON}>Export to JSON</MenuItem>
        </Menu>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  open: state.HomePage.UI.drawerOpen
});

const mapDispatchToProps = {
  handleDrawerOpen,
  requestExportCSV,
  requestExportJSON
};

const StyledDrawer = withStyles(styles, { withTheme: true })(AppDrawer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledDrawer);
