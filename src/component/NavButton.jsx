import React, { Component } from "react";
import "./NavButton.css";


export class NavButton extends Component {
  render() {
    return (
      <div id="nav-button-outer-div">
        <div id="nav-button-div">
          <button
            className="nav-button"
            id="pomodoro-button"
            onClick={this.onPomodoro}
          >
            Pomodoro
          </button>
          <button
            className="nav-button"
            id="break-button"
            onClick={this.onBreak}
          >
            Break
          </button>
            <button className="nav-button" id="time-button"
            onClick={this.onTime}
            >
              Time
            </button>
        </div>
      </div>
    );
  }
  onBreak = () => {
    if (this.props.started == "pomodoro"
    ) {
      window.alert("Stop pomodoro timer before starting break.");
    } else {
      document
        .getElementById("break-button")
        .classList.add("nav-button-selected-js");
      document
        .getElementById("pomodoro-button")
        .classList.remove("nav-button-selected-js");
      document
        .getElementById("time-button")
        .classList.remove("nav-button-selected-js");

      this.props.history.push("/break");
    }
  };
  onPomodoro = () => {
    if (this.props.started == "break"
    ) {
      window.alert("Stop break timer before starting pomodoro timer.");
    } else {
      document
        .getElementById("break-button")
        .classList.remove("nav-button-selected-js");
      document
        .getElementById("pomodoro-button")
        .classList.add("nav-button-selected-js");
      document
        .getElementById("time-button")
        .classList.remove("nav-button-selected-js");

      this.props.history.replace("/");
    }
  };
  onTime = () => {
  
      document
        .getElementById("break-button")
        .classList.remove("nav-button-selected-js");
      document
        .getElementById("pomodoro-button")
        .classList.remove("nav-button-selected-js");
      document
        .getElementById("time-button")
        .classList.add("nav-button-selected-js");

      this.props.history.replace("/time");
    }
  
}

export default NavButton;
