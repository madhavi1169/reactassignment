
import * as actionTypes from './actionTypes'
export const selectBuiling =(buildingId)=>{
    return{
        type:actionTypes.SELECT_BUILDING,
        id:buildingId
    }

}
export const selectDate =(date,startTime,endTime)=>{
    return{
        type:actionTypes.SELECT_DATE,
        date:date,
        startTime:startTime,
        endTime:endTime



    }

}
export const selectStartTime =(time)=>{
    return{
        type:actionTypes.SELECT_START_TIME,
        startTime:time
    }

}
export const selectEndTime = (time)=>{
    return{
        type:actionTypes.SELECT_END_TIME,
        endTime:time
    }
}
export const saveRoom = (room)=>{
    return{
        type:actionTypes.SAVE_ROOM,
        room:room
    }
}
export const clearRoom = ()=>{
    return{
        type:actionTypes.CLEAR_ROOM
    }
}