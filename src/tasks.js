import React from 'react';






function Tasks(props){

let taskLi = props.taskList;
//console.log("tasks", taskLi)

  const removeTask = (e) => {
   // console.log("this tasked is done", e);
    for(let i=0; i < taskLi.length; i++){
    if(e === taskLi[i].task){
      taskLi.splice(i,1)
     // console.log("e", taskLi[i])
    }
    //console.log(taskLi)
    props.newTaskList(taskLi)
  }
  }



let filteredTasks = props.taskList.sort((a, b) => {
  let fa = a.deadline,
        fb = b.deadline

        if (fa < fb) {
        return -1;
         }
        if (fa > fb) {
        return 1;
        }
         return 0;
        
});
console.log("filtered tasks", filteredTasks)


  return (

    <div style={{border: "solid black 1px", width: "22vw", height: "75vh", position: "relative", bottom: "75vh"}}>
      <h1>Tasks</h1>
      <div>
        <ul>{Object.values(props.taskList).map((list, i) => (
          <li key={i}>
          {list.task + " - " + list.deadline}<button onClick={() => removeTask(list.task)}>Remove</button>
          </li>
      ))}</ul>
      </div>
    </div>


  )


}

  

export default Tasks;

