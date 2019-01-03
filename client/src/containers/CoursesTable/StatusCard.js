import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { calculateAverage } from '../../utils/GPACalculator';

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

const UnstyledStatusCard = ({ classes, fpo_avg, percentage_scale }) => (
  <Card className={classes.card}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Summary of displaying courses
      </Typography>
      <Typography component="p">
        4.0 scale GPA of the current courses is {fpo_avg}. <br />
        Percentage Scale of the current courses is {percentage_scale} <br />
        Calculation: Only courses with the INAVG tag is calculated in the GPA
      </Typography>
    </CardContent>
  </Card>
);

UnstyledStatusCard.propTypes = {
  classes: PropTypes.object.isRequired,
  fpo_avg: PropTypes.number.isRequired,
  percentage_scale: PropTypes.number.isRequired
};

const StatusCard = withStyles(styles)(UnstyledStatusCard);

const mapStateToProps = state => ({
  fpo_avg: calculateAverage(state.Table.currentData, 'fpo_scale', 'inavg'),
  percentage_scale: calculateAverage(state.Table.currentData, 'percentage_grade', 'inavg')
});

export default connect(
  mapStateToProps,
  null
)(StatusCard);
