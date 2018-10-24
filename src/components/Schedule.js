import React, { Component } from 'react';
import {Card, CardBody, CardTitle, Table} from 'reactstrap';
import {UncontrolledDropdown, Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import data from './data.json';

class Schedule extends React.Component{
    constructor(props) {
        super(props);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
     // dropdownOpen: false,
      modal: false,
     // className: "Tech elective",
      numClass: null,
     // Jdata: this.props.data,
      timePref: null,
      filteredData: data,
      genButton: this.props.genButton,

    };
}
componentDidUpdate(prevProps) {

 // if(this.props.genButton === true){
      
        if (this.props.numClass !== prevProps.numClass) {
            this.setState({numClass: this.props.numClass});
        }
        if (this.props.timePref !== prevProps.timePref) {
            this.setState({timePref: this.props.timePref});
            this.detTime()
        }
   // }
       // this.setState({genButton: this.props.genButton})
  // }
  }

    toggleModal() {
        this.setState(prevState => ({
            modal: !this.state.modal
        }));
    }

    detTime(){
        var sTime = []
        if(this.props.timePref == 'AM'){
            data.map((c) => {
                try{
                    for(var i = 0; i < 5; i++){
                        if(c.sections[0].meetTimes[i].meetTimeBegin === "7:25 AM" ||
                        c.sections[0].meetTimes[i].meetTimeBegin === "8:30 AM" ||
                        c.sections[0].meetTimes[i].meetTimeBegin === "9:35 AM" ||
                        c.sections[0].meetTimes[i].meetTimeBegin === "10:40 AM" ||
                        c.sections[0].meetTimes[i].meetTimeBegin === "11:45 AM" ||
                        c.sections[0].meetTimes[i].meetTimeBegin === "12:50 PM" ||
                        c.sections[0].meetTimes[i].meetTimeBegin === "1:55 PM"){
                            sTime.push(c)
                        }
                    }
                }catch(e){
                    console.log('error', e);        
                }
            })
            this.setState({filteredData : sTime})
        }
        if(this.props.timePref == 'PM'){
            data.map((c) => {
                try{
                    for(var i = 0; i < 5; i++){
                        if(c.sections[0].meetTimes[i].meetTimeBegin !== "7:25 AM" &&
                        c.sections[0].meetTimes[i].meetTimeBegin !== "8:30 AM" &&
                        c.sections[0].meetTimes[i].meetTimeBegin !== "9:35 AM" &&
                        c.sections[0].meetTimes[i].meetTimeBegin !== "10:40 AM" &&
                        c.sections[0].meetTimes[i].meetTimeBegin !== "11:45 AM" &&
                        c.sections[0].meetTimes[i].meetTimeBegin !== "12:50 PM" &&
                        c.sections[0].meetTimes[i].meetTimeBegin !== "1:55 PM"){
                            sTime.push(c)
                            console.log( c.sections[0].meetTimes[i].meetTimeBegin)
                        }
                    }
                }catch(e){
                    console.log('error', e);        
                }
            })
            this.setState({filteredData : sTime})
        }
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
                    {this.state.filteredData.slice(0,this.props.numClass).map((c) =>
                    <tr>
                        <td>{c.code}</td>
                        <td><UncontrolledDropdown>>
                            <DropdownToggle caret>
                                {c.name}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={this.state.select}>Some other Class Name @ MWF</DropdownItem>
                                <DropdownItem onClick={this.state.select}>Another Class @ some time</DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                        </td>
                        <td>{c.sections[0].credits}</td>
                    </tr>
                    )}
                </tbody>
                </Table>
            </CardBody>
            </Card>
           </div>
        )
    }
}

export default Schedule;