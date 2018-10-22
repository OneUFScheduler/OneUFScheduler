import React, { Component } from 'react';
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Card, CardBody, CardTitle} from 'reactstrap';
import Schedule from './Schedule';

class FilterSideBar extends React.Component{
    constructor(props) {
        super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropdownOpen: false,
      dropNum: "Number of Classes"
    };
}
toggle(event) {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  select(event) {
    this.setState({
      dropNum: event.target.innerText
    });
  }

    render(){
        return (
            <div>
            <Card>
            <CardBody>
                <CardTitle>Filtering Options</CardTitle>
                <Dropdown value = {this.state.dropNum} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.state.dropNum}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.select}>1</DropdownItem>
                    <DropdownItem onClick={this.select}>2</DropdownItem>
                    <DropdownItem onClick={this.select}>3</DropdownItem>
                    <DropdownItem onClick={this.select}>4</DropdownItem>
                    <DropdownItem onClick={this.select}>5</DropdownItem>
                    <DropdownItem onClick={this.select}>6</DropdownItem>
                    <DropdownItem onClick={this.select}>7</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                <row>
                </row>
            </CardBody>
            </Card>
            <div class="column"><Schedule numClass={this.props.dropNum}/> </div>
            </div>
        )
    }
}

export default FilterSideBar;
