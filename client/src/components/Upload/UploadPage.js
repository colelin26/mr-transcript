import React from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Help from '@material-ui/icons/Help';
import Dragbox from './Dropfile';
import About from '../../containers/CoursesTable/About';
import {
  handleDrawerOpen,
  drawerWidth,
  HOME_PAGE,
  COURSE_TABLE,
  SCHEME_SETTING,
  GRADUATION_REQUIREMENT,
  EXPORT_DATA
} from '../../actions/HomePage';

require('../../assets/Upload/UploadPage.css');

const styles = theme => ({
  title: {
    fontSize: 40
  },
  button: {
    margin: theme.spacing.unit
  },
  menuButton: {
    margin: theme.spacing.unit,
    height: 30,
    width: 150
  },
  buttonAlignText: {
    paddingTop: 14
  },
  titleBox: {
    flexDirection: 'row',
    display: 'flex'
  },
  buttonRow: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flexStart'
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
  link: {
    margin: theme.spacing.unit
  },
  '@media (min-width: 930px)': {
    header: {
      width: '34%'
    }
  }
});

const UploadPage = ({
  pdfDropped,
  classes,
  message,
  onDrop,
  submitPDF,
  onCancel,
  getDemo,
  toggleAbout,
  pdfSubmitted
}) => {
  if (pdfSubmitted) {
    return <Redirect to={`/${HOME_PAGE}/${COURSE_TABLE}`} />;
  }
  return (
    <div className={`${classes.container} bg`}>
      <Card className={classes.header}>
        <CardContent className={classes.titleBox}>
          <Typography className={classes.title}>WATranscript</Typography>
          <Tooltip title="See the instruction of the app">
            <IconButton aria-label="See the instruction of the app" onClick={toggleAbout}>
              <Help />
            </IconButton>
          </Tooltip>
          <About />
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
            Upload your UW transcript from{' '}
            <Link href="https://uwaterloo.ca/quest/" target="_blank" rel="noopener">
              Quest
            </Link>{' '}
            to calculate your 4.0 GPA
          </Typography>
          <br />
          <div className={classes.buttonRow}>
            <Button variant="contained" className={classes.menuButton} onClick={submitPDF}>
              <Link onClick={getDemo}>Demo</Link>
            </Button>
            <Typography component="p" className={classes.buttonAlignText}>
              &quot;I want to see a demo.&quot; Ok..here is the data updated from my transcript :)
            </Typography>
          </div>
          <div className={classes.buttonRow}>
            <Button variant="contained" className={classes.menuButton} onClick={submitPDF}>
              <Link
                href="https://github.com/colelin26/WATranscript/blob/master/server.js"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </Link>
            </Button>
            <Typography component="p" className={classes.buttonAlignText}>
              Your transcript PDF or transcript data will not be saved by any means.
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

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
