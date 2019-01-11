import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { toggleAbout } from '../../actions/HomePage';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  },
  button: {
    margin: '1px',
    height: 'auto',
    width: 'auto'
  },
  link: {
    margin: theme.spacing.unit
  }
});

let About = ({ classes, aboutOpen, toggleAbout }) => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={aboutOpen}
    onClose={toggleAbout}
  >
    <div className={classes.paper}>
      <Typography variant="h6" id="modal-title">
        About
      </Typography>
      <Typography variant="subtitle2" id="simple-modal-description">
        The GPA conversion is based on{' '}
        <Link
          className={classes.link}
          target="_blank"
          rel="noopener"
          href="https://www.ouac.on.ca/guide/omsas-conversion-table"
        >
          OMSAS
        </Link>
        .
        <Typography variant="subtitle2" id="simple-modal-description">
          Earned credits are also taken into the factor as this is how the official transcript
          calculates the overall average. The higher the credits, the higher the weight of a course
          would be.
        </Typography>
      </Typography>
      <Typography variant="subtitle2" id="simple-modal-description">
        Some engineering and Math transcripts are used to test the app. There might be chances that
        your transcript are not supported yet. Feel free to open an{' '}
        <Link
          className={classes.link}
          target="_blank"
          rel="noopener"
          href="https://github.com/colelin26/WATranscript/issues"
        >
          issue
        </Link>{' '}
        or DM me and I would be happy to help!
      </Typography>
      <br />
      <Button onClick={toggleAbout} variant="contained" className={classes.button}>
        Close
      </Button>
    </div>
  </Modal>
);

About.propTypes = {
  classes: PropTypes.object.isRequired
};

About = withStyles(styles)(About);

const mapStateToProps = state => ({
  aboutOpen: state.HomePage.UI.aboutOpen
});

const mapDispatchToProps = {
  toggleAbout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About);
