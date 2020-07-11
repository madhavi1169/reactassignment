import React, { Component } from 'react';
import {buildingsDetails,buidlingFloorRoomsDetails} from '../../store/buildingDetails';
import './SelectedBuilding.css'
class SelectedBuilding extends Component{
   
     checkOngoingRooms =()=>{
        let roomsbook = []
        roomsbook = localStorage.getItem('roomsBook');
        if (roomsbook){
            roomsbook = JSON.parse(roomsbook)
        }
        let availableRooms = buidlingFloorRoomsDetails.filter(room => room.buildingId === this.props.selectedBuilingId);
        let onGoingMeetingsArray = [];
        if (roomsbook){
        roomsbook.forEach(room =>{
           for (let i=0;i<availableRooms.length;i++){
               if (room.roomId === availableRooms[i].roomId){
                   if ( this.isRoomSelectedDateIsCurrentDate(room) && new Date() > new Date(room.startTime) && new Date() < new Date(room.endTime)){
                      onGoingMeetingsArray.push(availableRooms[i])
                   }
               }
           }
       })
       let roomOnGoingMeeings = [...new Set(onGoingMeetingsArray)]
       return roomOnGoingMeeings.length
    }
    return 0

    }
    isRoomSelectedDateIsCurrentDate(room){
        let startDate = new Date(room.startTime)
                const month = startDate.getMonth()+1;
                const day = startDate.getDate();
                const year = startDate.getFullYear();
                let currentDate = new Date()
                return (currentDate.getDate() === day && currentDate.getMonth()+1 === month && currentDate.getFullYear() === year )
                
    }
     checkAvailableRoomsInBuilding = () =>{

       return buidlingFloorRoomsDetails.filter(room => room.buildingId === this.props.selectedBuilingId).length

    }

    getTodaysMeetings(){
        let roomsbook = []
        roomsbook = localStorage.getItem('roomsBook');
        if (roomsbook){
            roomsbook = JSON.parse(roomsbook)
            const r = roomsbook.filter(room => {
                return (room.buildingId === this.props.selectedBuilingId && this.isRoomSelectedDateIsCurrentDate(room))
                
            })
            return r.length
        }
        return 0

    }

    render(){
        const checkFreeRooms = this.checkAvailableRoomsInBuilding()-this.checkOngoingRooms();
        const todayMeetings = this.getTodaysMeetings();
        const meetingsOngoing = this.checkOngoingRooms()
    return(
        <React.Fragment>
        <div className='Buildings'>
        <h4>Buildings</h4>
        <p>Total no of buildings: {buildingsDetails.length}</p>
    </div>
    <div className='Buildings'>
        <h4>Rooms</h4>
        <p>Total no of rooms in building :{buidlingFloorRoomsDetails.filter(room => room.buildingId === this.props.selectedBuilingId).length}</p>
            <p>Free rooms in building : {checkFreeRooms}</p>
    </div>
    <div className='Buildings'>
        <h4>Meetings</h4>
        <p>Total no of meetings :{todayMeetings > 0 ? todayMeetings : 'no meetings'} </p>
         <p>{meetingsOngoing > 0 ? 'Total '+ meetingsOngoing +' ongoing now' : null}</p>
    </div>
    </React.Fragment>
    )
}
}
export default SelectedBuilding;