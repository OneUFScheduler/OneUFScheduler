import React, { Component } from 'react';
import {Card, CardBody, CardTitle, Table} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Schedule extends React.Component{
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
        return(
            <Card>
            <CardBody>
                <CardTitle> <strong>Suggested Schedules</strong> </CardTitle>
                <Table bordered>
                <thead>
                    <tr>
                        <th>Class Type</th>
                        <th>Class Info</th>
                        <th>Number of Credits</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Gen Ed</th>
                        <th><Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Some Class @ MWF
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Some other Class Name @ MWF</DropdownItem>
                                <DropdownItem>Another Class @ some time</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </th>
                        <th>3</th>
                    </tr>
                    <tr>
                        <th>Required Class</th>
                        <th><a href="#">Some Other Class Name @ MWF</a></th>
                        <th>3</th>
                    </tr>
                </tbody>
                </Table>
            </CardBody>
            </Card>
        )
    }
}

export default Schedule;