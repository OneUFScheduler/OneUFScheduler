import React, { Component } from 'react';
import {Card, CardBody, CardTitle, Table} from 'reactstrap';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import data from './data.json';

class Schedule extends React.Component{
    constructor(props) {
        super(props);
    this.toggleDrop = this.toggleDrop.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      dropdownOpen: false,
      modal: false,
      className: "Tech elective",
      numClass: null,
    };
}
componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.numClass !== prevProps.numClass) {
      this.setState({numClass: this.props.numClass});
    }
  }
  
    toggleDrop() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen,
        }));
    }

    toggleModal() {
        this.setState(prevState => ({
            modal: !this.state.modal
        }));
    }

    select(event) {
        this.setState({
          className: event.target.innerText
        });
      }

    render(){
        
        return(
            <div class="column">
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
                        <th><Dropdown value = {this.state.className} isOpen={this.state.dropdownOpen} toggle={this.toggleDrop}>
                            <DropdownToggle caret>
                                {this.state.className}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.state.select}>Some other Class Name @ MWF</DropdownItem>
                                <DropdownItem onClick={this.state.select}>Another Class @ some time</DropdownItem>
                            </DropdownMenu>
                            </Dropdown>
                        </th>
                        <th>{this.props.numClass}</th>
                    </tr>
                    <tr>
                        <th>Required Class</th>
                        <th><a href="#" onClick={this.toggleModal}>Some Other Class Name @ MWF</a></th>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                            <ModalHeader toggle={this.toggleModal}>Class Information</ModalHeader>
                            <ModalBody>
                                This will display extra info like a brief description of the class along with the professor, exam dates, etc.
                            </ModalBody>
                            <ModalFooter>
                            </ModalFooter>
                        </Modal>
                        <th>3</th>
                    </tr>
                </tbody>
                </Table>
            </CardBody>
            </Card>
           </div>
        )
    }
}

export default Schedule;