import React, { Component } from 'react';
import SelectingBuilding from '../../components/SelectingBuilding/SelectingBuilding'
import {buildingsDetails,timeSelection} from '../../store/buildingDetails';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect} from 'react-redux';
import * as actions from '../../store/actions';
import './AddMeeting.css';


class AddMeeting extends Component{
    state= {
        startTime :'',
        endTime:'',
        error:null

    }
    componentDidMount(){
        this.props.onSelectBuilding(buildingsDetails[0].buildingId)
        
    }
    dateChangeHandler = date => {

      this.props.onSelectDate(date,
        this.convertDateFormatWithTime(this.state.startTime,date),
        this.convertDateFormatWithTime(this.state.endTime,date))

    }
    
    selectBuildingHandler = (event) => {
        // this.setState({ selectedBuilingId: event.target.value });
        this.props.onSelectBuilding(event.target.value)
      };
      startTimeHandler =(event) =>{

          this.props.onSelectStartTime(this.convertDateFormatWithTime(event.target.value,this.props.selectedDate))
          this.setState({...this.state,startTime:event.target.value})

      }
      endTimeHandler =(event) =>{
    
        this.props.onSelectEndTime(this.convertDateFormatWithTime(event.target.value,this.props.selectedDate))
         this.setState({...this.state,endTime:event.target.value})

    }
    convertDateFormatWithTime(value,selectDate){
        const time = value;
        const month = selectDate.getMonth()+1;
        const day = selectDate.getDate();
        const year = selectDate.getFullYear();
        
        // const dateTime = new Date( month + "/" + day + "/" + year + ' ' + time);
        const dateTime =  month + "/" + day + "/" + year + ' ' + time ;

        return dateTime

    }

      nextBtnClicked = () =>{
        let errorMsg = ''

       

        if (new Date() > new Date(this.props.selectedStartTime)){
            errorMsg = 'Please select valid start time'

        }
        else if (new Date() > new Date(this.props.selectedEndTime)){
            errorMsg = 'Please select valid end time'
        }
        else if (new Date(this.props.selectedEndTime) <= new Date(this.props.selectedStartTime)){
            errorMsg = 'End time should be greater than start time'
        }
        else{
            errorMsg = null
        }
        this.setState({...this.state,error:errorMsg})
        if (!errorMsg) 
                 this.props.history.push('/rooms')
    }
    render(){
        return (<div className="AddMeeting">

            <h4>Add meeting</h4> 

            
            <div className="Date">
            <label>Date</label> 
            <DatePicker className="Selection"  selected={this.props.selectedDate} onChange={(date)=>this.dateChangeHandler(date)} />
            </div>
            <div className="Date">
            <label>Start Time</label>
            <select  className="Selection" onChange={(event)=>this.startTimeHandler(event)} value={this.state.startTime}>
              {timeSelection.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            </div>
            <div className="Date">
            <label>End Time</label> 
            <select className="Selection" onChange={(event)=>this.endTimeHandler(event)} value={this.state.endTime }>
              {timeSelection.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            </div>
            <SelectingBuilding  change={this.selectBuildingHandler} value={this.props.selectedBuilingId?this.props.selectedBuilingId:'Select Building'}/>
              <p>{this.state.error}</p>
            
            <button className="Button" onClick={this.nextBtnClicked}>Next</button>

        </div>)
    }

}

const mapStateToProps = (state) => {
  return {
    selectedBuilingId: state.selectedBuilingId,
    selectedDate: state.selectedDate,
    selectedStartTime: state.selectedStartTime,
    selectedEndTime: state.selectedEndTime,
  };
};
  const mapDispatchToProps = dispatch =>{
    return {
      onSelectBuilding:(id)=>dispatch(actions.selectBuiling(id)),
      onSelectDate:(date,sTime,eTime)=>dispatch(actions.selectDate(date,sTime,eTime)),
      onSelectStartTime:(time)=>dispatch(actions.selectStartTime(time)),
      onSelectEndTime:(time)=>dispatch(actions.selectEndTime(time))
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(AddMeeting);