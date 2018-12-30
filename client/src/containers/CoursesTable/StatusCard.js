import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

const UnstyledStatusCard = ({ classes, fpo_avg }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Summary of displaying courses
      </Typography>
      <Typography component="p">4.0 scale GPA of the current courses is {fpo_avg}.</Typography>
    </CardContent>
  </Card>
);

UnstyledStatusCard.propTypes = {
  classes: PropTypes.object.isRequired,
  fpo_avg: PropTypes.number.isRequired
};

const StatusCard = withStyles(styles)(UnstyledStatusCard);

const mapStateToProps = state => ({
  fpo_avg: state.Status.fpo_avg
});

export default connect(
  mapStateToProps,
  null
)(StatusCard);
