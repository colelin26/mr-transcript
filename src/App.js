import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar title="WAT-Transcript"/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
