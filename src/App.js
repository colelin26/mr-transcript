import React, { Component } from 'react';
import AppHeader from './AppHeader';
import NavBar from './NavBar';
import CoursesTable from './CoursesTable';
import StatusCard from './StatusCard';

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
    console.log(json);
    this.setState({
      transcript: json,
      pdfUploaded: true,
      courses: json.courses,
      info: {
        fpo_avg: json.fpo_avg,
      }
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
          <NavBar title="WATranscript" 
                filterText={this.state.filterText} 
                onFilterTextChange={this.handleFilterTextChange}
          />
        }
        {
          (this.state.courses.length > 0) &&
          <StatusCard info={this.state.info}
          />
        }
        {
          (this.state.courses.length > 0) &&
          <CoursesTable rows={this.state.courses}
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
