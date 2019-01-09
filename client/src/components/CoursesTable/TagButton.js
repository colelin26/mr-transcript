import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

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
let OutlinedButtons = ({ classes, tags, tagMap }) => {
  const buttons = Object.keys(tags)
    .filter(key => {
      if (key === 'hasGrade') return false;
      if (tags[key]) return true;
      return false;
    })
    .map(tag => (
      <Button variant="outlined" className={classes.button}>
        {tagMap[tag]}
      </Button>
    ));
  return <div className={classes.container}>{buttons}</div>;
};

OutlinedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.object.isRequired
};

OutlinedButtons = withStyles(styles)(OutlinedButtons);

export default connect(
  state => ({
    tagMap: state.Table.tagMap
  }),
  null
)(OutlinedButtons);
