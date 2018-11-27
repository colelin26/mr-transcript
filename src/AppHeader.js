import React from 'react';
import Dragbox from './Dropfile';
import('./AppHeader.css');
import('./Dropfile')

function Header() {
    return (<header className="App-header">
    <h1>
        WAT-transcript
    </h1>
    <Dragbox />
    <p>
      Upload your UW transcript to see the magic
    </p>
  </header>)
}

export default Header;