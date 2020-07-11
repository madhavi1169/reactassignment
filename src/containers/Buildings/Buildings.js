import React, { Component } from "react";
import {
  buildingsDetails
} from "../../store/buildingDetails";
import SelectingBuilding from "../../components/SelectingBuilding/SelectingBuilding";
import SelectedBuilding from "../../components/SelectedBuilding/SelectedBuilding";

import "./Buildings.css";
class Buildings extends Component {
  state = {
    selectedBuilingId: buildingsDetails[0].buildingId,
  };

  selectBuildingHandler = (event) => {
    this.setState({ selectedBuilingId: event.target.value });
  };

  onAddMeetingClicked = () => {
    this.props.history.push("/meeting");
  };
  

  render() {
    return (
      <div className='BuildingPage'>
        <SelectingBuilding change={this.selectBuildingHandler} value={this.state.selectedBuilingId} />
        <SelectedBuilding selectedBuilingId={this.state.selectedBuilingId} />

        <button className="Button" onClick={this.onAddMeetingClicked}>
          Add a Meeting
        </button>
      </div>
    );
  }
}

export default Buildings;
