import React, { Component } from 'react';
import request from 'superagent';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dragbox from './Dropfile';

require('./AppHeader.css');

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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfDropped: false,
      file: []
    };
    this.togglePDFDropped = this.togglePDFDropped.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  togglePDFDropped(files, bool) {
    this.setState({
      pdfDropped: bool,
      files: files
    });
  }

  uploadFile() {
    const req = request.post('/upload');
    req.attach('transcript', this.state.files[0]);
    req.end((err, res) => {
      if (err) throw new Error('upload failed');
      this.props.confirmPDFSubmitted(res.body);
    });
  }

  render() {
    return (
      <div className={`${this.props.container} bg`}>
        <header className={this.props.classes.header}>
          <h1>WATranscript</h1>
          <Dragbox togglePDFDropped={this.togglePDFDropped} />
          <p>Upload your UW transcript to see the magic</p>
          {this.state.pdfDropped && (
            <Button
              variant="contained"
              color="primary"
              className={this.props.classes.button}
              onClick={this.uploadFile}
            >
              I'm Ready
            </Button>
          )}
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Header);
