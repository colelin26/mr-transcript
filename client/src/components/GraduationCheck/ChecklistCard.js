import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  card: {
    width: '16em',
    margin: '1em'
  },
  title: {
    fontSize: 14
  },
  item: {
    margin: 0
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class ChecklistCard extends React.Component {
  state = {
    open: true
  };

  componentDidMount() {
    const { courses } = this.props;
    if (courses.length >= 5) {
      this.setState(state => ({ open: false }));
    }
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, description, requireNum, courses } = this.props;
    const { open } = this.state;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {description}: Choose {requireNum} of:
          </Typography>
          <ListItem button onClick={this.handleClick}>
            {courses.length >= 5 ? (
              <ListItemText inset primary="More than 5 courses available" />
            ) : (
              <ListItemText inset primary="Courses" />
            )}
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
              {courses.map(course => (
                <ListItem key={course.title} role={undefined} dense button>
                  <Checkbox checked={course.passed} tabIndex={-1} disableRipple />
                  <ListItemText primary={course.title} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </CardContent>
      </Card>
    );
  }
}

ChecklistCard.propTypes = {
  classes: PropTypes.object.isRequired,
  requireNum: PropTypes.number.isRequired,
  courses: PropTypes.array.isRequired
};

export default withStyles(styles)(ChecklistCard);
