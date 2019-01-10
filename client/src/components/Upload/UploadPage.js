import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Dragbox from './Dropfile';

require('../../assets/Upload/UploadPage.css');

const styles = theme => ({
  title: {
    fontSize: 40
  },
  button: {
    margin: theme.spacing.unit
  },
  header: {
    minWidth: 275,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: 'auto',
    width: '60%',
    margin: 'auto',
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

const UploadPage = ({ pdfDropped, classes, message, onDrop, submitPDF, onCancel, getDemo }) => (
  <div className={`${classes.container} bg`}>
    <Card className={classes.header}>
      <CardContent>
        <Typography className={classes.title}>WATranscript</Typography>
      </CardContent>
      <Dragbox onDrop={onDrop} message={message} onCancel={onCancel} />
      <CardContent>
        {pdfDropped && (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={submitPDF}
          >
            I am Ready
          </Button>
        )}
        <Typography component="p">
          Upload your UW transcript to calculate your 4.0 GPA and check graduation requirements
        </Typography>
        <br />
        <Typography component="p">
          Your transcript PDF or transcript Data will not be saved on the server as Heroku
          filesystem is ephemeral. You can also check{' '}
          <a
            href="https://github.com/colelin26/WATranscript/blob/master/server.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            the source code.
          </a>
        </Typography>
        <br />
        <Typography component="p">
          &quot;I want to see a demo.&quot;{' '}
          <a href="#" onClick={getDemo}>
            Sure...
          </a>{' '}
          Here is the data on my transcript. : )
        </Typography>
      </CardContent>
    </Card>
  </div>
);

UploadPage.propTypes = {
  pdfDropped: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  submitPDF: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  getDemo: PropTypes.func.isRequired
};

export default withStyles(styles)(UploadPage);
