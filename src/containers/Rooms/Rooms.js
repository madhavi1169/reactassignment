
import React, { Component } from 'react';
import {buildingsDetails,buidlingFloorRoomsDetails,buildingFloorDetails} from '../../store/buildingDetails';
import { connect} from 'react-redux';
import * as actions from '../../store/actions'
import './Rooms.css'

class Rooms extends Component{
    state = {
        activeRoom:null,
        selectedRoom: null
    }
    onSaveClicked = ()=>{

        this.props.onSaveRoom(this.state.selectedRoom)
        this.props.onClearRoom()
        alert('Room booked successfully');
        this.props.history.push('/')
    }
    componentDidMount(){
        if (!this.props.selectedBuilingId){
            this.props.history.replace('/meeting')
        }
    }

    
    getBuildingName =(roomBuildingId)=>{

        let obj = buildingsDetails.find(building => building.buildingId === roomBuildingId);
        return obj ? obj.buildingName : ''
    }
    getFloorName =(roomBuildingId)=>{

        let obj = buildingFloorDetails.find(building => building.floorId === roomBuildingId);
        return obj ? obj.floorName : ''
    }

    roomSelectionHandler (room) {
        if (this.checkRoomAvailableForDate(room)){
        return alert('Room already booked with same time.Please change time')
    }

        const setRoom = {roomId:room.roomId,
            date:this.props.selectedDate,
            startTime:this.props.selectedStartTime,
            endTime:this.props.selectedEndTime,
            buildingId:room.buildingId
        }
        this.setState({activeRoom:room.roomId,selectedRoom:setRoom})
    }
    checkRoomAvailableForDate(room){
        let roomsbook = []
        roomsbook = localStorage.getItem('roomsBook');
        if (roomsbook){
            roomsbook = JSON.parse(roomsbook)
            const r = roomsbook.filter(rbook => {
               
                if (rbook.roomId === room.roomId){

                if (new Date(rbook.startTime).getTime() === new Date(this.props.selectedStartTime).getTime() ){
                    return true
                }
                else if (new Date(rbook.endTime).getTime()  === new Date(this.props.selectedEndTime).getTime() ){
                    return true
                }
                else if (new Date(rbook.startTime).getTime()  > new Date(this.props.selectedStartTime).getTime()  && new Date(rbook.startTime).getTime()  < new Date(this.props.selectedEndTime).getTime() ){
                    return true

                }
                else if (new Date(rbook.startTime).getTime()  < new Date(this.props.selectedStartTime).getTime()  && new Date(rbook.endTime).getTime()  > new Date(this.props.selectedStartTime).getTime() ){
                    return true
                }
                else{
                    return false
                }
            }
                return false
                
            })
            return r.length
        }
    }

    render(){
        let rooms = buidlingFloorRoomsDetails.filter(room => room.buildingId === this.props.selectedBuilingId)
        return (<div className='RommsPage' >
           <h4>Please Select one of the free rooms</h4> 
           {rooms.map(room =>(
               <div key={room.roomId} 
               className= {`Rooms ${room.roomId === this.state.activeRoom ? "activeRoom" : ""}`} 
               onClick={()=>this.roomSelectionHandler(room)}>
                 {this.checkRoomAvailableForDate(room) ? <p style={{color:'red'}}> Not available for selected Date and Time</p>:null}
                   <h4>{room.roomName}</h4>
                     <p>{this.getBuildingName(room.buildingId)}</p>
                     <p>{this.getFloorName(room.floorId)}</p>
               </div>
           )

           )}

            <button className="Button" onClick={this.onSaveClicked}>Save
                 </button>

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
        onSaveRoom:(room)=>dispatch(actions.saveRoom(room)),
        onClearRoom:()=>dispatch(actions.clearRoom())
      }
    }
export default connect(mapStateToProps,mapDispatchToProps)(Rooms);