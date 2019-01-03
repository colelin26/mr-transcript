import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: '1px',
    height: '2rem',
    width: '6rem',
  },
  input: {
    display: 'none',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

function OutlinedButtons(props) {
  const { classes, tags } = props;
  const buttons = Object.keys(tags).filter((key) => {
    if (tags[key]) return true;
    else return false;
  }).map((tag) =>
    <Button variant="outlined" className={classes.button}>
      {tag}
    </Button>);
  return (
    <div className={classes.container}>
      {buttons}
    </div>
  );
}

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedButtons);
