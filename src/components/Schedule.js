import React, { Component } from 'react';
import {UncontrolledAlert, Alert, Card, CardBody, CardTitle, Table} from 'reactstrap';
import {UncontrolledDropdown, Button, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import data from './data.json';
import techE from './te.json';
import taken from './person.json';

let info = {}

class Schedule extends React.Component{
    constructor(props) {
        super(props);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.displayInfo = this.displayInfo.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
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
      modal: false,
      activeModal: info,
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
						//console.log("PM")
					//	console.log(this.state.filteredElect)
           // console.log("Hello2End");
        }
    }

    displayInfo() {
    // you can access the item object and the event object
    console.log("This is being called from displayInfo" + this.state.activeModal);
    var other = this.state.activeModal;
    console.log("modal " + other);
        var prerequisites = "";
        var description = "";
        var classLocation = "";
        var classRoom = "";
        var classProfessor = "";
        try{
            prerequisites = other.prerequisites;
        }catch(e){
            prerequisites = "*No Prerequisites"
        }
        try{
            description = other.description
        }catch(e){
            description = "*No Description";
        }
        try{
            classLocation = other.sections[0].meetTimes[0].meetBuilding;
        }catch(e){
            classLocation = "TBD";
        }
        try{
            classRoom = other.sections[0].meetTimes[0].meetRoom;
        }catch(e){
            classRoom = "TBD";
        }
        try{
            classProfessor = other.sections[0].instructors[0].name;
        }catch(e){
            classProfessor = "TBD";
        }
        return <ModalBody>{description} {prerequisites}<br></br><br></br>Location: {classLocation} {classRoom} Professor: {classProfessor}</ModalBody>;

    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }

    toggleModal=(other)=>{
        console.log("This was reached!");
        console.log("heyooo " + other.description);
        this.setState({
            modal: !this.state.modal,
            activeModal: other,
        });
        console.log("heyooo2 " + this.state.activeModal.description);
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

        let numOtherClasses = this.state.numClass;
        let includeSpecific;
        // if(this.state.foundClass !== null){
        //     numOtherClasses = numOtherClasses -1;
        //     includeSpecific = (
        //         this.state.foundClass.map((specific, index) => {
        //             return (

        //             <tr>
        //             <td>{specific.code}</td>
        //             <td><a href='#' onClick={this.toggleModal}> {specific.name} </a></td>
        //             <Modal isOpen={this.state.modal} toggle={this.toggleModal} >
        //                 <ModalHeader toggle={this.toggleModal}>Class Description</ModalHeader>
        //                  <PopupTable data_class={specific}></PopupTable>
        //             </Modal>
        //             <td>{specific.sections[0].credits}</td>
        //         </tr>
        //     )}))}
        // else {includeSpecific = ''}

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
						<th>Meet Time</th>
                    </tr>
                </thead>
                <tbody>
                {includeSpecific}
                {arr.slice(0,(numOtherClasses-this.props.numElect)).map((other, index) =>
                <tr key={index}>
                    <td>{other.code}</td>

										<td><a href='#' onClick={this.toggleModal.bind(this, other)}> {other.name} </a></td>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>Class Description</ModalHeader>
                                        {this.displayInfo()}
                                        </Modal>
                    <td>{other.sections[0].credits}</td>
										<UncontrolledDropdown>
												 <Sections selects = {other}></Sections>
									 </UncontrolledDropdown>
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
                        <td>NA</td>
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

class Sections extends React.PureComponent{
    render(){
        let sectionsArr = []
        let sectionsEnd = []
				let sectionsNum = []
				let sectionsDay = []
        let arr = this.props.selects
        //console.log("THIS IS FOR TESTING")
        //console.log("SECTIONS LENGHT")
        //console.log(arr)
        //console.log(arr.sections.length)
        let count = 0
				let broke = 0;
				//console.log("DEBUG")
				//console.log(arr.sections[3])

							for(var t = 0; t < arr.sections.length; t++)
							{
								try{
									sectionsDay.push(arr.sections[t].meetTimes[0].meetDays)
									sectionsNum.push(arr.sections[t].number)
									sectionsArr.push(arr.sections[t].meetTimes[0].meetTimeBegin)
                  //console.log(count++)
                               // console.log(arr.sections[t].meetTimes[t].meetTimeEnd);

								} catch(e){
									//console.log("Not Working for: " + arr.sections[t])
									//console.log(broke++)
									//console.log(e)

										continue
                }
                try{
                    sectionsEnd.push(arr.sections[t].meetTimes[0].meetTimeEnd)
                   // console.log(arr.sections[t].meetTimes[t].meetTimeEnd);

                    }catch(e)
                    {
                       // console.log(e);
                       continue
                    }
							}
						//console.log("HELLOOOOO")
                        //	console.log(sectionsArr);

							sectionsArr = sectionsArr.map((m, index) =>
						 			<option key={index}>Section {sectionsNum[index]}: {m} - {sectionsEnd[index]} Meet Days: {sectionsDay[index]}</option>

						);

        return(
            <select>{sectionsArr}</select>
						//<select>hi</select>
        )
    }
}


class PopupTable extends React.PureComponent{
    render(){
        var d = this.props.data_class
        console.log(d);
        var c_prof = []
        var c_loc = []
        var c_room = []
				var description = []
        var cap = 0;
				var test = 1;
				var spot = 0;
						//console.log("HOWDY");
						//console.log(cap);
                try{
										description.push(d.description)
										//console.log(d.description)
                    c_loc.push(d.sections[0].meetTimes[0].meetBuilding)
                }catch(e){
                    c_loc.push("TBD");
									}
                try{
                    c_room.push(d.sections[0].meetTimes[0].meetRoom)
                }catch(e){
                    c_room.push("TBD")
                }
                try{
                    c_prof.push(d.sections[0].instructors[0].name)
                }catch(e){
                    c_prof.push("TBD")
                }

        // console.log(c_loc[0])
        // console.log(c_room[0])
        // console.log(c_prof[0])
				description = description.map((m, index) =>
						<div key={index}>{description[index]}</div>


			);
			//console.log("DESC 0: ")
			//console.log(description[0])
        return(
            <div>
            <ModalBody>
                {description} {d.prerequisites}
								<br>
								</br>
								<br>
								</br>
								Location: {c_loc[0]} {c_room[0]} Professor: {c_prof}
            </ModalBody>


            </div>
        )
    }
    }



export default Schedule;
