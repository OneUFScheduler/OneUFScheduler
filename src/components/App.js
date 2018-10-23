import React, { Component } from 'react';
import '../styles/App.css';
import Schedule from './Schedule';
import FilterSideBar from './FilterSideBar';
import NavBar from './NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div class="row">
        <div ><FilterSideBar /></div>
        </div>
      </div>
    );
  }
}

export default App;
