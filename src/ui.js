import React from 'react';
import Calendar from './calendar';
import moment from 'moment';
//import Nextprevmonth from './nextprevMonth';
import Tasks from './tasks';


// här ska state för taskList ägas. skapas sparas. 


// importera andra komponenter för att bygga interface


class Ui extends React.Component {

  state = {
    taskList: [],
    
  
  }

  componentDidMount() {
    //om innehåll finns i LS så ska vi hämta det och lägga in som state: TaskList.
    if( localStorage.getItem("taskList") === null){

    } else {
      let taskfromLocal = localStorage.getItem('taskList');
      let parsedFromLocal = JSON.parse(taskfromLocal)
      this.setState({taskList: parsedFromLocal});
      
    }
  }

 newTask = (getnewTask) => {
  console.log("newtask i UI", getnewTask);
  this.setState({ taskList: [...this.state.taskList, getnewTask] })
  let newTaskList = this.state.taskList;
  newTaskList.push(getnewTask)

  localStorage.setItem("taskList", JSON.stringify(newTaskList)) 
  //this.setState({taskList: getnewTask}) 

}

newTaskList = (getNewTaskList) => {
  this.setState({taskList: getNewTaskList})
  localStorage.setItem("taskList", JSON.stringify(getNewTaskList)) 
}

    
//hantera callback sätt state. setState

    render(){



    return (
    <div>
      <div>
        React Calendar - Inlämningsuppgift - Anton Åhlander
      </div>
      < Calendar   taskList={this.state.taskList} newTask={this.newTask}   />
      <Tasks   taskList={this.state.taskList} newTaskList={this.newTaskList} />
    </div>
    );
  }
}
  
export default Ui;