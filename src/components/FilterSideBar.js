import React, { Component } from 'react';
import {Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Card, CardBody, CardTitle} from 'reactstrap';

class FilterSideBar extends React.Component{
    constructor(props) {
        super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
}
toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

    render(){
        return (
            <Card>
            <CardBody>
                <CardTitle>Filtering Options</CardTitle>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    Number of Classes
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>1</DropdownItem>
                    <DropdownItem>2</DropdownItem>
                    <DropdownItem>3</DropdownItem>
                    <DropdownItem>4</DropdownItem>
                    <DropdownItem>5</DropdownItem>
                    <DropdownItem>6</DropdownItem>
                    <DropdownItem>7</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                <row>
                <Button color="primary" size="lg">Generate</Button>
                </row>
            </CardBody>
            </Card>
            
        )
    }
}

export default FilterSideBar;