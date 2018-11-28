import React, { Component } from 'react';
import AppHeader from './AppHeader';
import NavBar from './NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      filters: [],
      filterText:'',
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  togglePDFDropped() {
    this.setState({
      pdfDropped: !this.state.pdfDropped,
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
        {/* <NavBar title="WAT-Transcript" 
                filterText={this.state.filterText} 
                onFilterTextChange={this.handleFilterTextChange}
        /> */}
        <AppHeader togglePDFDropped/>
        
      </div>
    );
  }
}

export default App;
