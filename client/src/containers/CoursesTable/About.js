import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
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
        The application parses and scrapes the PDF using poppler and Nodejs. The GPA conversion is
        based on{' '}
        <a
          href="https://www.ouac.on.ca/guide/omsas-conversion-table"
          target="_blank"
          rel="noopener noreferrer"
        >
          OMSAS
        </a>
        . Engineering and Math transcripts are used to build the app. There might be chances that
        your transcript are not supported yet. Feel free to open an{' '}
        <a
          href="https://github.com/colelin26/WATranscript/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue
        </a>{' '}
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
