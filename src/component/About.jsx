import React, { Component } from "react";
import "./About.css";
import cancel from "../img/cancel.svg";

export class About extends Component {
  render() {
    return (
      <div id="about-outer-div">
        <h1 id="about-h1">About</h1>
        <img
          src={cancel}
          alt="cancel"
          onClick={this.props.onCancel}
          id="cancel-button"
        />

        <div className="clear-both" />
        <div className="about-innter-div-1 about-innter">
          <h2 className="inner-title">About Website</h2>
          <p>
            Pomodoro Timer is Ad free,simple and easy to use Pomodoro
            Timer.Pomodoro Timer is a productivity app which improves your
            focus.New features and improvements are coming in the future
          </p>
        </div>
        <div className="about-innter-div-2 about-innter">
          <h2 className="inner-title">About pomodoro technique</h2>
          <p>
            The Pomodoro Technique is a time management method developed by
            Francesco Cirillo in the late 1980s. The technique uses a timer to
            break down work into intervals, traditionally 25 minutes in length,
            separated by short breaks. Each interval is known as a pomodoro,
            from the Italian word for 'tomato', after the tomato-shaped kitchen
            timer that Cirillo used as a university student.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
