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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ReportProblem from '@material-ui/icons/ReportProblem';
import TableChart from '@material-ui/icons/TableChart';
import ImportExport from '@material-ui/icons/ImportExport';
import ListAlt from '@material-ui/icons/ListAlt';
import LinkIcon from '@material-ui/icons/Link';

import {
  handleDrawerOpen,
  drawerWidth,
  HOME_PAGE,
  COURSE_TABLE,
  SCHEME_SETTING,
  GRADUATION_REQUIREMENT,
  GRADUATION_CHECK
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
            <ListItemIcon>
              <TableChart />
            </ListItemIcon>
            <ListItemText primary="Course Table" />
          </ListItem>
          <ListItem component={Link} to={`/${HOME_PAGE}/${GRADUATION_CHECK}`} button key={3}>
            <ListItemIcon>
              <ListAlt />
            </ListItemIcon>
            <ListItemText primary="Graduation Requirement Check" />
          </ListItem>
          <ListItem button key={2}>
            <ListItemIcon>
              <ImportExport />
            </ListItemIcon>
            <ListItemText primary="Export Data" onClick={this.handleDataExportClick} />
          </ListItem>
          <ListItem
            button
            key={1}
            component="a"
            target="_blank"
            rel="noopener"
            href="https://www.ouac.on.ca/guide/omsas-conversion-table"
          >
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary="GPA Converter Schema" />
          </ListItem>
          <ListItem
            button
            key={1}
            component="a"
            target="_blank"
            rel="noopener"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdoCAn65lStAvMXJH9eUaLbgiD-2YnIUAJPpXGoIVC6nQIvXQ/viewform"
          >
            <ListItemIcon>
              <ReportProblem />
            </ListItemIcon>
            <ListItemText primary="Report an Issue" />
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
