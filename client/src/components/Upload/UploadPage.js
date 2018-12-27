import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dragbox from './Dropfile';

require('../../assets/Upload/UploadPage.css');

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '60%',
    margin: 'auto',
    fontSize: 'calc(10px + 2vmin)',
    backgroundColor: 'aliceblue',
    opacity: '0.7',
    fontFamily: "'Open Sans', sans-serif"
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  '@media (min-width: 930px)': {
    header: {
      width: '34%'
    }
  }
});

const UploadPage = ({ pdfDropped, classes, message, onDrop, submitPDF, onCancel }) => (
  <div className={`${classes.container} bg`}>
    <header className={classes.header}>
      <h1>WATranscript</h1>
      <Dragbox onDrop={onDrop} message={message} onCancel={onCancel} />
      <p>Upload your UW transcript to see the magic</p>
      {pdfDropped && (
        <Button variant="contained" color="primary" className={classes.button} onClick={submitPDF}>
          I am Ready
        </Button>
      )}
    </header>
  </div>
);

UploadPage.prototype = {
  pdfDropped: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  uploadPDF: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default withStyles(styles)(UploadPage);
