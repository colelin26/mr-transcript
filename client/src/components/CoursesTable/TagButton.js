import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: '1px',
    height: 'auto',
    width: 'auto'
  },
  input: {
    display: 'none'
  },
  container: {
    display: 'flex',
    flexDirection: 'row'
  }
});
const OutlinedButtons = ({ classes, tags }) => {
  const buttons = Object.keys(tags)
    .filter(key => {
      if (tags[key]) return true;
      return false;
    })
    .map(tag => (
      <Button variant="outlined" className={classes.button}>
        {tag}
      </Button>
    ));
  return <div className={classes.container}>{buttons}</div>;
};

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired
};

export default withStyles(styles)(OutlinedButtons);
