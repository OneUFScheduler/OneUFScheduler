import React, { Component } from 'react';
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Card, CardBody, CardTitle, FormGroup, Label, Input} from 'reactstrap';
import Schedule from './Schedule';
import data from './data.json';

class FilterSideBar extends React.Component{
    constructor(props) {
        super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.toggleElect = this.toggleElect.bind(this);
    this.selectElect = this.selectElect.bind(this);
    this.toggleTime = this.toggleTime.bind(this);
    this.selectTime = this.selectTime.bind(this);
    this.handleGen = this.handleGen.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      dropdownOpen: false,
      dropdownOpenE: false,
      dropdownOpenT: false,
      dropTime: "Time Preference",
      dropNum: "Number of Classes",
      dropElective: "Number of Electives",
      jsonData: data,
      search: '',
      genButton: false,
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

  handleGen(event){
      event.preventDefault();
    this.setState(prevState => ({
        genButton: true
      }));
  }


  onSearch(event){
      this.setState({
          search: event.target.value
      })
 }

    render(){
        return (
            <div>
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
                    <DropdownItem divider />
                    <DropdownItem value =" " onClick={this.select}>Clear</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                <br />
                
                <ptitle>Specify Number of Electives</ptitle>
                <Dropdown value = {this.state.dropElect} isOpen={this.state.dropdownOpenE} toggle={this.toggleElect}>
                <DropdownToggle caret>
                    {this.state.dropElective}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem value="0" onClick={this.selectElect}>0</DropdownItem>
                    <DropdownItem value="1" onClick={this.selectElect}>1</DropdownItem>
                    <DropdownItem value="2" onClick={this.selectElect}>2</DropdownItem>
                    <DropdownItem value="3" onClick={this.selectElect}>3</DropdownItem>
                    <DropdownItem value="4" onClick={this.selectElect}>4</DropdownItem>
                    <DropdownItem value="5" onClick={this.selectElect}>5</DropdownItem>
                    <DropdownItem value="6" onClick={this.selectElect}>6</DropdownItem>
                    <DropdownItem value="7" onClick={this.selectElect}>7</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem value =" " onClick={this.selectElect}>Clear</DropdownItem>
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
                
                <Button color="primary" size="lg" onClick={this.handleGen}>Generate</Button>
                
            </CardBody>
            </Card>
            <div class="column">
            <Schedule genButton={this.state.genButton} numClass={this.state.dropNum} timePref={this.state.dropTime}> </Schedule>
            </div>
            </div>
        )
    }
}
export default FilterSideBar;