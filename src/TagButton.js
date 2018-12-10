import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    container: {
      display:'flex',
      flexDirection: 'column',
    },
  });

  function OutlinedButtons(props) {
    const { classes, tags } = props;
    return (
      <div className={classes.container}>
        {tags.map(tag => {
          return (
        <Button variant="outlined" className={classes.button}>
          {tag}
        </Button>
          );})
        }
      </div>
    );
  }
  
  OutlinedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(OutlinedButtons);
  