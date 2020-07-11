import * as actionTypes from "./actionTypes";

const initialState = {
  selectedBuilingId: null,
  selectedDate: new Date(),
  selectedStartTime: null,
  selectedEndTime: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_BUILDING:
      return { ...state, selectedBuilingId: action.id };
    case actionTypes.SELECT_DATE:
      return { ...state, selectedDate: action.date, selectedStartTime:action.startTime,selectedEndTime:action.endTime};
    case actionTypes.SELECT_START_TIME:
      return { ...state, selectedStartTime: action.startTime };
    case actionTypes.SELECT_END_TIME:
      return { ...state, selectedEndTime: action.endTime };
    case actionTypes.SAVE_ROOM:
            return saveBookedRoom(state,action)
    case actionTypes.CLEAR_ROOM:
            return {selectedBuilingId: null,
                selectedDate: new Date(),
                selectedStartTime: null,
                selectedEndTime: null}
    default:
      return state;
  }
};
const saveBookedRoom = (state,action)=>{
    let bookedRooms = localStorage.getItem('roomsBook')
            let bookRoom;
            if (bookedRooms){
                bookedRooms = JSON.parse(bookedRooms)
                bookRoom = [...bookedRooms,action.room]

            }else {
                bookRoom = [action.room]
            }
        localStorage.setItem('roomsBook',JSON.stringify(bookRoom))
        return state


}
export default reducer;
