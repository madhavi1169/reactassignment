import React from 'react';
import {buildingsDetails} from '../../store/buildingDetails';
import './SelectingBuilding.css'
const selectingBuilding = (props) =>{
        return (
        <React.Fragment>
<select className="SelectingBuilding" onChange={props.change} value={props.value}>
              {buildingsDetails.map((item) => (
                <option key={item.buildingId} value={item.buildingId}>
                  {item.buildingName}
                </option>
              ))}
            </select>
        </React.Fragment>)

}
export default selectingBuilding;