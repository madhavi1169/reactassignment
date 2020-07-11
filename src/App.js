import React, { Component } from 'react';
import './App.css';
import { Route, Switch ,Redirect} from "react-router-dom";
import Rooms from './containers/Rooms/Rooms';
import AddMeeting from './containers/AddMeeting/AddMeeting'
import Builings from './containers/Buildings/Buildings'


class App extends Component {
  render(){
    let routes = (
      <Switch>
      <Route path="/rooms" component={Rooms}/>
      <Route path="/meeting" component={AddMeeting}/>
      <Route path="/" exact component={Builings} />
      <Redirect to='/' />
      </Switch>
    );
  return <div className="App">{routes}</div>;
}
}

export default App;
