import React, { Component } from 'react';
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Card, CardBody, CardTitle, FormGroup, Label, Input} from 'reactstrap';
import Schedule from './Schedule';
import data from './data.json';
import { Container, Row, Col } from 'reactstrap';

let information = {
dropTime: "",
dropNum: "",
search: "",
dropElective: "",
genButton: ""
}

class FilterSideBar extends React.Component{
    constructor(props) {
        super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.toggleElect = this.toggleElect.bind(this);
    this.selectElect = this.selectElect.bind(this);
    this.toggleTime = this.toggleTime.bind(this);
    this.selectTime = this.selectTime.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.createElectiveList = this.createElectiveList.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownOpenE: false,
      dropdownOpenT: false,
      dropTime: "No Preference",
      dropNum: 5,
      dropElective: 2,
      jsonData: data,
      search: "",
      genButton: false,
      data: information,
      numElectiveError: "",
    };
}
toggle(event) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  select(event) {
    this.setState({
      dropNum: event.target.value
    });
  }

  toggleElect(event) {
    this.setState(prevState => ({
      dropdownOpenE: !prevState.dropdownOpenE,
    }));
  }

  selectElect(event) {
    this.setState({
      dropElective: event.target.value
    });
  }

  selectTime(event) {
    this.setState({
      dropTime: event.target.value
    });
  }

  toggleTime(event) {
    this.setState(prevState => ({
      dropdownOpenT: !prevState.dropdownOpenT,
    }));
  }


  onSearch(event){
      this.setState({
          search: event.target.value
      })
 }

 onSubmit(event){
      let info = {
              dropTime: this.state.dropTime,
              dropNum: this.state.dropNum,
              search: this.state.search,
              dropElective: this.state.dropElective,
              genButton: true
          }
      let error = ""
      if (this.state.dropNum < this.state.dropElective){
        error = "Error: You cannot have more electives than classes allowed";
        this.setState({
          numElectiveError: error
        })
      }
      else{
        this.setState({
            data: info,
            numElectiveError: error
        })
      }
 }

 createElectiveList() {    
    let items = []
     for (let i = 0; i <= this.state.dropNum; i++) {             
          items.push(<DropdownItem value={i} onClick={this.selectElect}>{i}</DropdownItem>);   
     }
     return items
  }  

    render(){
        return (
            <div>
              <Row>
                <Col xs="6" sm="4">
                  <Card>
                  <CardBody>
                      <CardTitle>Filtering Options</CardTitle>
                      <hr />
                      <ptitle>Specify Number of Classes</ptitle>
                      <Dropdown value = {this.state.dropNum} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret>
                          {this.state.dropNum}
                      </DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem value="1" onClick={this.select}>1</DropdownItem>
                          <DropdownItem value="2" onClick={this.select}>2</DropdownItem>
                          <DropdownItem value="3" onClick={this.select}>3</DropdownItem>
                          <DropdownItem value="4" onClick={this.select}>4</DropdownItem>
                          <DropdownItem value="5" onClick={this.select}>5</DropdownItem>
                          <DropdownItem value="6" onClick={this.select}>6</DropdownItem>
                          <DropdownItem value="7" onClick={this.select}>7</DropdownItem>
                      </DropdownMenu>
                      </Dropdown>
                      <br />
                      
                      <ptitle>Specify Number of Electives</ptitle>
                      <Dropdown value = {this.state.dropElect} isOpen={this.state.dropdownOpenE} toggle={this.toggleElect}>
                      <DropdownToggle caret>
                          {this.state.dropElective}
                      </DropdownToggle>
                      <DropdownMenu>
                          {this.createElectiveList()}
                      </DropdownMenu>
                      </Dropdown>
                      <br />
                      
                      <ptitle>Specify Time Preference</ptitle>
                      <Dropdown value = {this.state.dropTime} isOpen={this.state.dropdownOpenT} toggle={this.toggleTime}>
                      <DropdownToggle caret>
                          {this.state.dropTime}
                      </DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem value="AM" onClick={this.selectTime}>AM</DropdownItem>
                          <DropdownItem value="PM" onClick={this.selectTime}>PM</DropdownItem>
                          <DropdownItem divider />
                          <DropdownItem value =" " onClick={this.selectTime}>Clear</DropdownItem>
                      </DropdownMenu>
                      </Dropdown>
                      <br />

                      <FormGroup>
                      <Label>Include Specific Course</Label>
                      <Input type="class" name="class" placeholder="input course code" onChange={this.onSearch} />
                      </FormGroup>
                      <div><font color="red">{this.state.numElectiveError}</font></div>
                      <Button color="primary" size="lg" onClick={this.onSubmit}>Generate</Button>
                      
                  </CardBody>
                  </Card>
                </Col>
                <Col xs="auto">
                <Schedule genButton={this.state.data.genButton} numElect={this.state.data.dropElective} numClass={this.state.data.dropNum} timePref={this.state.data.dropTime} specificClass={this.state.data.search}> </Schedule>
                </Col>
              </Row>
            </div>
        )
    }
}
export default FilterSideBar;
