import React, { Component } from 'react';
import AppHeader from './AppHeader';
import NavBar from './NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: {},
      courses: [],
      filters: [],
      pdfUploaded: false,
      filterText:'',
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.confirmPDFSubmitted = this.confirmPDFSubmitted.bind(this);
  }

  confirmPDFSubmitted(json) {
    this.setState({
      transcript: json,
      pdfUploaded: true,
    });
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText
    });
  }

  render() {
    return (
      <div className="App">
        { this.state.pdfUploaded &&
          <NavBar title="WAT-Transcript" 
                filterText={this.state.filterText} 
                onFilterTextChange={this.handleFilterTextChange}
          />
        }
        { !this.state.pdfUploaded &&
          <AppHeader confirmPDFSubmitted={this.confirmPDFSubmitted}/>
        }
      </div>
    );
  }
}

export default App;
