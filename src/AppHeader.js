import React, { Component } from 'react';
import Dragbox from './Dropfile';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
    };
    this.togglePDFDropped = this.togglePDFDropped.bind(this);
  }

    togglePDFDropped() {
      this.setState({
        pdfDropped: !this.state.pdfDropped,
      });
    }

    render () {
        return (
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
          <Button variant="contained" color="secondary" className={this.props.classes.button}>
            I'm Ready
          </Button>
        }
      </header>);
    }
  }

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);