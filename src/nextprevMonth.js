import React from "react";
import moment from 'moment';

class Nextprevmonth extends React.Component {

    state = {
        currentMonth: this.props.currentMonth,
     
      }

      
    
    nextMonth = () => {
     
      
        //this.setState({currentMonth:parseInt(this.props.currentMonth)+1})
        this.setState({currentMonth: moment(this.props.currentMonth).add(1,'months').format("YYYYMM")})
       // console.log("nästa månad");
        this.props.getNewMonth(this.state.currentMonth);
        
        
    }


    previousMonth = () => {
        //this.setState({currentMonth:parseInt(this.props.currentMonth)-1})
        this.setState({currentMonth: moment(this.props.currentMonth).add(-1,'months').format("YYYYMM")})
        //console.log("förra månaden");
        this.props.getPrevMonth(this.state.currentMonth);
       // console.log(this.state.currentMonth);
        
        
    }

    render(){          
        
        let months = moment.months();
        


        let thisMonthNum = parseInt(moment(this.props.currentMonth).format("MM")) - 1;
        let thisMonthName = months[thisMonthNum];
       
    
      


    return (
        <div style={{display: "flex", flexDirection: "row", position: "relative", left: "52.5vw"}}>
        <button onClick={this.previousMonth} style={{background: "none", border: "none"}}>🡸</button>
        <h1 style={{marginBottom: "3vh", fontSize: "33px"}}><b>
        {thisMonthName}
        </b></h1>
        <button onClick={this.nextMonth} style={{background: "none", border: "none"}}>🡺</button>
        </div>
    );
  }
}
  
  export default Nextprevmonth;