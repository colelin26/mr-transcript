import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  card: {
    width: '16em',
    margin: '1em'
  },
  title: {
    fontSize: 14
  }
};

const ChecklistCard = ({ classes, description, requireNum, courses }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {description}: Choose {requireNum} of:
      </Typography>
      <List className={classes.root}>
        {courses.map(course => (
          <ListItem key={course.title} role={undefined} dense button>
            <Checkbox checked={course.passed} tabIndex={-1} disableRipple />
            <ListItemText primary={course.title} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

ChecklistCard.propTypes = {
  classes: PropTypes.object.isRequired,
  requireNum: PropTypes.number.isRequired,
  courses: PropTypes.array.isRequired
};

export default withStyles(styles)(ChecklistCard);
