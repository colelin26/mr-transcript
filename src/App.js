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
      pdfUploaded: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
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
        <AppHeader />
        
      </div>
    );
  }
}

export default App;
