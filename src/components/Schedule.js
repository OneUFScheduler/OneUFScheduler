import React, { Component } from 'react';
import {UncontrolledAlert, Alert, Card, CardBody, CardTitle, Table} from 'reactstrap';
import {UncontrolledDropdown, Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import data from './data.json';
import techE from './te.json';
import taken from './person.json';

class Schedule extends React.Component{
    constructor(props) {
        super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);

    this.state = {

      modal: false,
      numClass: null,
      alert: false,
      timePref: null,
      filteredData: data,
      filteredElect: techE,
      genButton: this.props.genButton,
      allData: [],
      numElect: null,
      specificClass: null,
      foundClass: null,
      classTaken: taken,
      suggest: null,
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

    toggleAlert(){
        this.setState(prevState => ({
            alert: !this.state.alert
        }));
    }

		//this is correctly saving the desired class info, but cant get it show up
    findClass(){
			var desClass = [];
      data.map((c) => {
                if(c.code === this.props.specificClass){
          		  desClass.push(c);
              }
            })

            this.setState({
              foundClass: desClass
            },() => {
               // console.log("HELLOFROMSPECIFCCLASS") //for debugging purposes
                console.log(this.state.foundClass);
               // console.log("HELLO FROM THIS SHIT WORKING")
            });

      /*  techE.map((c)=>{  //This is for TechE once we get regular working
            if(c.code === this.props.specificClass){
                this.setState({foundClass: c})

            }
        })*/
  }

	findTaken(){
			var took = []
			taken.map((c) => {
					try{
							for(var i = 0; i < 1; i++){
											took.push(c)
							}
							}catch(e){
									console.log('error', e);
							}
					});

				this.setState({classTaken : took})
				//console.log("Hello2");
				console.log(this.state.classTaken)
				//console.log("Hello2End");

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
						console.log("AM")
						console.log(this.state.filteredElect)
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
						//console.log("Hello2");
						console.log("PM")
						console.log(this.state.filteredElect)
           // console.log("Hello2End");
        }
    }

    render(){
        let optionItems = this.state.filteredElect.map((c) =>
                <option key={c.code}>{c.code + " " + c.name}</option>
            );
        
						//filter out the class someone has already taken
						var tooken = [];
						Object.keys(taken).forEach(function(code) {
							tooken.push(taken[code]);
                        });
                        
						console.log(tooken);
						var arr = [];
							Object.keys(data).forEach(function(code) {
								arr.push(data[code]);
							});
							console.log(arr)
							var i = 0;
							var l = 0;
							while (i < tooken.length){

								// Object.keys(arr).forEach(function(l) {
								// 	if(tooken[i].code === data[l].code)
								// 	{
								// 		arr.splice(l, 1);
								// 	}
								// 	l++;
								// });
								// i++;
								for(var k = 0; k < arr.length; k++)
								{
									if(arr[k].code == tooken[i].code)
									{
										arr.splice(k, 1);
									}
								}
								i++;
						}
							console.log(arr);

        let numOtherClasses = this.state.numClass;
        let includeSpecific;
        if(this.state.foundClass !== null){
            numOtherClasses = numOtherClasses -1;
            includeSpecific = (
                this.state.foundClass.map((specific, index) => {
                    return (
                    <tr>
                    <td>{specific.code}</td>
                    <td><a href='#' onClick={this.toggleModal}> {specific.name} </a></td>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
                        <ModalHeader toggle={this.toggleModal}>Class Description</ModalHeader>
                         <PopupTable data_class={specific}></PopupTable>
                    </Modal>
                    <td>{specific.sections[0].credits}</td>
                </tr>
            )}))}
        else {includeSpecific = ''}

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
                {includeSpecific}
                {arr.slice(0,(numOtherClasses-this.props.numElect)).map((other, index) =>
                <tr key={index}>
                    <td>{other.code}</td>

										<td><a href='#' onClick={this.toggleModal}> {other.name} </a></td>

										<Modal isOpen={this.state.modal} toggle={this.toggleModal} >
												<ModalHeader toggle={this.toggleModal}>Class Description</ModalHeader>
                                                    <PopupTable data_class={other}></PopupTable>
                                              
										</Modal>
                    <td>{other.sections[0].credits}</td>
                </tr>
                )}
                {this.state.filteredElect.slice(0,this.props.numElect).map((elect) =>
                    <tr>
                        <td>Tech Elective</td>
                        <td>
                        <UncontrolledDropdown>
                              <select>{optionItems}</select>
                        </UncontrolledDropdown>
                        </td>
                        <td>{elect.sections[0].credits}</td>
                    </tr>
                )}
                </tbody>
                </Table>
                <Button color="primary" size="lg" onClick={this.toggleAlert}>Register Classes</Button>
                {this.props.genButton ? (
                    <Alert color="success" isOpen={this.state.alert} toggle={this.toggleAlert}>
                    Successfully registered classes
                    </Alert>
                ) : (
                    <Alert color="danger" isOpen={this.state.alert} toggle={this.toggleAlert}>
                    Could not register for classes
                    </Alert>
                )}
            </CardBody>
            </Card>
           </div>
        )
    }
}

class PopupTable extends React.PureComponent{
    render(){
        var d = this.props.data_class
        console.log(d);
        var c_time_beg = []
        var c_time_end = []
        var c_prof = []
        var c_loc = []
        var c_room = []
        
            
                for(var index = 0; index <5; index ++){
                    try{
                    c_time_beg.push(d.sections[index].meetTimes[index].meetTimeBegin)
                }catch(e){
                    console.log('error', e);
                }
                try{
                    c_time_end.push(d.sections[index].meetTimes[index].meetTimeEnd)
                }catch(e){
                    console.log('error', e);
                try{
                    c_loc.push(d.sections[index].meetTimes[index].meetBuilding)
                }catch(e){
                    c_loc.push("TBD");
                try{
                    c_room.push(d.sections[index].meetTimes[index].meetRoom)
                }catch(e){
                    c_room.push("TBD")
                }
                try{
                    c_prof.push(d.sections[index].instructors[index].name[index])
                }catch(e){
                    c_prof.push("TBD")
                }
            }
        console.log(c_time_beg[0])
        console.log(c_time_end[0])
        console.log(c_loc[0])
        console.log(c_room[0])
        console.log(c_prof[0])
        return(
            <div>
            <ModalBody>
                {d.description} {d.prerequisites}
            </ModalBody>
            <ModalFooter>
                Class time: {c_time_beg[0]} - {c_time_end[0]}
            <div className="display-linebreak"> 
                Location: {c_loc[0]} {c_room[0]}
            </div>
                Professor: {c_prof[0]}
            </ModalFooter>
            </div>
        )
    }
    }
}
}

export default Schedule;