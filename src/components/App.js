import React, { Component } from 'react';
import '../styles/App.css';
import Schedule from './Schedule';
import FilterSideBar from './FilterSideBar';
import NavBar from './NavBar';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div>
          <NavBar />
          <div ><FilterSideBar /></div>
      </div>
    );
  }
}

export default App;
