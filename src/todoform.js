import React from "react";
import {useState} from 'react';


function PopUpInput(props) {


const [task, setTask] = useState("")


const [trigger, setTrigger] = useState(props.trigger);


const [savedTask, setSavedTask] = useState("");

const [savedDeadline, setSavedDeadline] = useState("");

let chosenDate = props.chosenDate;


let chosenDateShort = chosenDate.substring(0, chosenDate.length - 3);


let chosenDateShorter = chosenDate.substring(6);
if(parseInt(chosenDateShorter) < 10){
   chosenDateShorter = chosenDateShorter.substring(1);
   
}
console.log("chosen Day", chosenDateShorter);


const onChange = (event) => {
    setTask(event.target.value)
}


const saveTask = () => {
   
    setTrigger(false)
    props.changeTrigger(false)
    
    setSavedTask(task)
    setSavedDeadline(props.chosenDate)
    let sendTask = {task: task, deadline: props.chosenDate, yearMonth: chosenDateShort, day: chosenDateShorter};

    props.newTask(sendTask);
   // console.log(props.newTask);
   // console.log("savedTask", {savedTask});
   // console.log("savedDeadline", {savedDeadline})
    
}

//console.log(props.taskList);
const taskList = props.taskList;
//console.log(taskList);

        
        return (props.trigger) ? (
          <div style={{backgroundColor: "lightblue", position: "absolute", zIndex:"5", justifyContent: "center", width:"30vw", height: "30vh", left: "90vh", display: "flex", alignItems:"center", top: "15vh", border: "solid black 4px" }}className="PopUpInput">

              <div  id="inputTask"style={{marginTop: "0vh"}} className="PopUp-Inner">
              
              <h1>Create New Task</h1>
              <h3>{props.chosenDate}</h3>
              <input onChange={onChange} id="popInput" className="popInput" style={{width: "25vw"}} placeholder="write the name on you task here"></input>
              <br></br>
              <button onClick={saveTask}>Save</button>
              
             
              {props.children}
              </div>
          </div>
        ): "";
    }
      
      export default PopUpInput;