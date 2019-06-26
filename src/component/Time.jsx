import React, { Component } from "react";
import Clock from "react-live-clock";
import "./Time.css"

export class Time extends Component {
  render() {
    return (
      <div id="time-div">
      <h1 id="time-hour">
        <Clock format={"h:mm:ss"} ticking={true} id="time-part-1"/>
        <Clock format={"A"} ticking={true} id="time-part-2"/>
        <div style={{"clear":"both"}}></div>
      </h1>
       <h2 id="time-date"><Clock format={"dddd, MMMM Do | YYYY"} ticking={true} /></h2>      
    </div>
    );
  }
}

export default Time;
