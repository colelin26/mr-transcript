import React, { Component } from 'react';
import Dragbox from './Dropfile';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import request from 'superagent';
import('./AppHeader.css');

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Header extends Component {
  constructor(props) {
    console.log(props.classes);
    super(props);
    this.state = {
      pdfDropped: false,
      pdfUploaded: false,
      file:[],
    };
    this.togglePDFDropped = this.togglePDFDropped.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

    togglePDFDropped(files) {
      this.setState({
        pdfDropped: !this.state.pdfDropped,
        files: files,
      });
    }

    uploadFile() {
      console.log('buttonclicked');
      const req = request.post('/upload');
      req.attach('transcript', this.state.files[0]);
      req.end((err, res) => {
        if (err) throw new Error('upload failed');
        console.log(res);
      });
    }

    render () {
        return (
        <div className="bg container">
          <header className="App-header">
          <h1>
              WAT-transcript
          </h1>
          <Dragbox togglePDFDropped={this.togglePDFDropped}/>
          <p>
            Upload your UW transcript to see the magic
          </p>
          {
            this.state.pdfDropped &&
            <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.uploadFile}>
              I'm Ready
            </Button>
          }
        </header>
      </div>);
    }
  }

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);