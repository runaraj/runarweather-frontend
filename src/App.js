import React, { Component } from 'react';
import './App.css';
import Selector from './components/Selector';


class App extends Component {
  // state = {users: []}
  // url = "https://cors-anywhere.herokuapp.com/https://www.yr.no/place/Norway/Akershus/B%C3%A6rum/Sandvika/forecast_hour_by_hour.xml"

  componentDidMount() {    
    console.log("App mounted");
  }

  render() {
    return (
      <div className="App">
        <Selector/>
      </div>
    );
  }
}

export default App;
