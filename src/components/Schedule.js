import React, { Component } from 'react';
import {Card, CardBody, CardTitle, Table} from 'reactstrap';
import {UncontrolledDropdown, Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import data from './data.json';
import techE from './te.json';

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
      filteredElect: techE,
      genButton: this.props.genButton,
      allData: [],
      numElect: null,
      specificClass: null,
      foundClass: null,
    };
}
componentDidUpdate(prevProps) {

     if(this.props.genButton === true){
        console.log("yes");

            if (this.props.numClass !== prevProps.numClass) {
                this.setState({numClass: this.props.numClass});
            }
            if (this.props.timePref !== prevProps.timePref) {
                this.setState({timePref: this.props.timePref});
                this.detTime()
            }
            if (this.props.numElect !== prevProps.numElect) {
                this.setState({numElect: this.props.numElect});
            }
            if(this.props.specificClass !== prevProps.specificClass) {
                this.setState({specificClass: this.props.specificClass})
                this.findClass();
            }
       // }
           // this.setState({genButton: this.props.genButton})
      }
      else{
        console.log("false");
      }
  }

    toggleModal() {
        this.setState(prevState => ({
            modal: !this.state.modal
        }));
    }

    //this is correctly saving the desired class info, but cant get it show up
    findClass(){
			var desClass = []
        data.map((c) => {

            if(c.code === this.props.specificClass){
							  desClass.push(c);
                this.setState({foundClass: desClass});
								this.setState({foundClass: desClass});
								console.log(desClass);
								console.log(this.state.foundClass);
								console.log("HELLO");

            }
						this.setState({foundClass: desClass});
						console.log(this.state.foundClass);
        })
      /*  techE.map((c)=>{
            if(c.code === this.props.specificClass){
                this.setState({foundClass: c})

            }
        })*/
				this.setState({foundClass: desClass});
				console.log(this.state.foundClass);
    }

    detTime(){
        var sTime = []
        if(this.props.timePref == 'AM'){
            techE.map((c) => {
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
            this.setState({filteredElect : sTime})
        }
        if(this.props.timePref == 'PM'){
            techE.map((c) => {
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
            this.setState({filteredElect : sTime})
						console.log("Hello2");
						console.log(this.state.filteredElect)
        }
    }

    checkSpecific(){
        if(this.state.foundClass !== null){
            this.state.foundClass.map((c) => {
                return (
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
                )
            })
        }
        else return ''
    }

    makeDropDown(){
        this.state.filteredElect.map((c) =>{
            return(
            <UncontrolledDropdown>>
                <DropdownToggle caret>
                {c.code + c.name}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={this.state.select}>{c.code +c.name}</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
            )
        })
    }

    render(){
        let optionItems = this.state.filteredElect.map((c) =>
                <option key={c.code}>{c.code + " " + c.name}</option>
            );

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
                {this.checkSpecific}
                {this.state.filteredData.slice(0,(this.props.numClass-this.props.numElect)).map((c) =>
                <tr>
                    <td>{c.code}</td>
                    <td>{c.name}</td>
                    <td>{c.sections[0].credits}</td>
                </tr>
                )}
                {this.state.filteredElect.slice(0,this.props.numElect).map((c) =>
                    <tr>
                        <td>Tech Elective</td>
                        <td>
                        <UncontrolledDropdown>
                              <select>{optionItems}</select>
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
