import React from 'react';
//import reactDom from 'react-dom';
import Nextprevmonth from './nextprevMonth.js';
import moment from 'moment';
//import {useState} from 'react';
import PopUpInput from './todoform';


let daysShort = moment.weekdaysShort();


let daysInM = [
  '31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'
]


class Calendar extends React.Component {

  state = {
    currentDate: moment().format("YYMM"),
    currentMonth: moment().format("YYYYMM"),
    currentDay: moment().format("DD"),
    popUp: false,
    chosenDate: "",
    

  }

  
  
saveNewMonth = (getMonth) => {
  //console.log("callback i calendar");
  this.setState({currentMonth: getMonth});
}  



DayClicked = (e) => {

  this.setState({popUp: true});
  // måste omvandla single digit strings så att de får en 0 framför. så att 6 blir 06. måste ha in en IF för att bara lägga till 0 om numret är under 10
 let dayString = e.target.innerHTML;
 //console.log(dayString);

 if(parseInt(dayString) < 10){
   let newDayString = 0 +  dayString;
   //console.log("newDayString",newDayString);
  if(newDayString.length > 2){
   let shortenedDayString = newDayString.substring(0,3);
   this.setState({chosenDate: this.state.currentMonth + shortenedDayString})
  }
 } else {
   
  this.setState({chosenDate: this.state.currentMonth + e.target.innerHTML})
 }


  
}


changeTrigger = (getTrigger) => {
  this.setState({popUp: getTrigger})
}





render(){
 
    let thisMonthNum = parseInt(moment(this.state.currentMonth).format("MM")) - 1;
  

  let firstDay = moment(this.state.currentMonth).startOf('month').format("d"); 
  
    let firstDayArray = [];
    for (var i = 1; i <= firstDay; i++ ){
   
        firstDayArray.push("")
        
    }
  
    let days = [];
    for (var d = 1; d <= daysInM[thisMonthNum]; d++ ){
   
    days.push(d);
    
    }


const newDayArray = firstDayArray.concat(days);

let blanksEnd = 44 - newDayArray.length;


let endBlanks = [];
for (var b = 1; b <= blanksEnd; b++) {
  endBlanks.push("")
}

const newDayArray2 = newDayArray.concat(endBlanks);

let rows = [];
let cells = [];

let taskThisMonth = [];
  let count = "";
  let tasks = this.props.taskList;
  //console.log("tasks",tasks);
  //console.log(this.state.currentMonth)
  count = tasks.filter(task => task.yearMonth === this.state.currentMonth).length; 
  for (i=0; i < tasks.length; i++){
    
    if(tasks[i].yearMonth === this.state.currentMonth){
      //console.log("task in this month",tasks[i]);
      taskThisMonth.push(tasks[i]);
     
    } else {
     //console.log("task in other month",tasks[i]);
   }
  }

let h = 0;
let objectArrayofDays = [];
for(h=0; h < newDayArray2.length; h++){
  objectArrayofDays.push({day: newDayArray2[h], task: ""});
  
  
}
//console.log("objectArrayofDays", objectArrayofDays);

for (d=0; d < taskThisMonth.length; d++) {
  console.log(taskThisMonth[d].day);
  let tskD = taskThisMonth[d].day;
  let tskT = taskThisMonth[d].task;
  let filtered = objectArrayofDays.filter(object => object.day === parseInt(tskD));
  //console.log("filtrera lista",filtered);
  filtered[0].task = tskT;
  //console.log("updated filtered", filtered)
  objectArrayofDays.push(filtered);
  // console.log("tskT", tskT)
  // console.log("obs", objectArrayofDays);
}

console.log(count);



objectArrayofDays.forEach((row, r) => {
    if (r % 7 !== 0) {
      cells.push(row); //  om r inte är 7 så går det till nästa vecka
    } else {
      rows.push(cells); 
      cells = []; // tomma rutor 
      cells.push(row); 
    }
    if (r === objectArrayofDays.length - 1) { 
      rows.push(cells);
    }
  });
 
 // console.log("thismonthtasks", taskThisMonth);
  //console.log("days" , objectArrayofDays);
 
  
    return (
      <div>
        < Nextprevmonth currentMonth={this.state.currentMonth} getNewMonth={this.saveNewMonth} getPrevMonth={this.saveNewMonth}/>
        <table style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "120vh", position: "relative", left: "22vw"}}>
          <thead style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "120vh",
                         height: "10vh", position: "relative", left: "7vw"}}> 
      {daysShort.map((days) => (
          <tr style={{display: "flex", flexDirection: "row", border: "solid black 1px",
           padding: "10px", minWidth: "17.8vh", maxWidth: "17.8vh", width: "17.8vh",
           justifyContent: "space-evenly"}}><td>{days}</td></tr>
      ))}</thead>
             <tbody>
                <tr style={{display: "flex", flexDirection: "row", position: "relative", left: "1vw", width: "80vw"}}>
                    {rows[1].map((row) => (
                  <td onClick={this.DayClicked} id={row}  style={{display: "flex", flexDirection: "row", justifyContent: "space-around", textAlign: "center",
                              border: "solid black 1px", padding: "10px", width: "17.8vh", height:"8vh"}}>{row.day} {row.task}
                              </td>))}
                </tr>
                <tr style={{display: "flex", flexDirection: "row", position: "relative", left: "1vw", width: "80vw"}}>
                  {rows[2].map((row) => (
                    <td onClick={this.DayClicked} id={row}  style={{display: "flex", flexDirection: "row", justifyContent: "space-around", textAlign: "center", 
                                border: "solid black 1px", padding: "10px", width: "17.8vh", height: "8vh"}}>{row.day} {row.task}
                               </td>))}
                </tr>
                <tr style={{display: "flex", flexDirection: "row", position: "relative", left: "1vw", width: "80vw"}}>
                  {rows[3].map((row) => ( 
                    <td onClick={this.DayClicked} id={row} style={{display: "flex", flexDirection: "row", justifyContent: "space-around", textAlign: "center",
                                border: "solid black 1px", padding: "10px", width: "17.8vh", height: "8vh"}}>{row.day} {row.task}
                                </td>))}
                </tr>
                <tr style={{display: "flex", flexDirection: "row", position: "relative", left: "1vw", width: "80vw"}}>
                  {rows[4].map((row) => ( 
                    <td onClick={this.DayClicked} id={row} style={{display: "flex", flexDirection: "row", justifyContent: "space-around", textAlign: "center",
                                border: "solid black 1px", padding: "10px", width: "17.8vh", height: "8vh"}}>{row.day} {row.task}
                                </td>))}
                </tr>
                <tr style={{display: "flex", flexDirection: "row", position: "relative", left: "1vw", width: "80vw"}}>
                  {rows[5].map((row) => (
                    <td onClick={this.DayClicked} id={row} style={{display: "flex", flexDirection: "row", justifyContent: "space-around", textAlign: "center", 
                                border: "solid black 1px", padding: "10px", width: "17.8vh", height: "8vh"}}>{row.day} {row.task}
                                </td>))}
                </tr>
                <tr style={{display: "flex", flexDirection: "row", position: "relative", left: "1vw", width: "80vw"}}>
                  {rows[6].map((row) => (
                    <td onClick={this.DayClicked} id={row} style={{display: "flex", flexDirection: "row", justifyContent: "space-around", textAlign: "center", 
                                border: "solid black 1px", padding: "10px", width: "17.8vh", height: "8vh"}}>{row.day} {row.task}
                                </td>))}
                </tr>
           </tbody>
      </table>
      <PopUpInput taskList={this.props.taskList} chosenDate={this.state.chosenDate} trigger={this.state.popUp}  changeTrigger={this.changeTrigger} newTask={this.props.newTask}></PopUpInput>
      </div>
    );
  }
}
  
  export default Calendar;