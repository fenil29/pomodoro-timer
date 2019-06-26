import React, { Component } from "react";
import NavBar from "./NavBar.jsx";
// import NavButton from "./component/NavButton.jsx";
// import Temp from "./Temp.jsx";
import CircularSelector from "./CircularSelector.jsx";
import CircularSelector2 from "./CircularSelector2.jsx";
import Time from "./Time.jsx";
import About from "./About.jsx";
import Setting from "./Setting.jsx";
import NavButton from "./NavButton.jsx";
import NotFound404 from "./NotFound404.jsx";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export class Main extends Component {
  state = {
    About: false,
    Setting: false,
    switchChecked: localStorage.getItem("switchChecked")
      ? localStorage.getItem("switchChecked") == "true"
      : true,
    PomodoroTimeData: localStorage.getItem("PomodoroTimeData") || 25,
    BreakTimeData: localStorage.getItem("BreakTimeData") || 10,
    started: localStorage.getItem("started") || ""
  };
  componentWillUnmount() {
    localStorage.setItem("PomodoroTimeData", this.state.PomodoroTimeData);
    localStorage.setItem("BreakTimeData", this.state.BreakTimeData);
    localStorage.setItem("switchChecked", this.state.switchChecked);
    localStorage.setItem("started", this.state.started);
  }
  componentDidMount() {
    window.addEventListener("beforeunload", ev => {
      this.componentWillUnmount();
    });
  }
  handleCancel = () => {
    this.setState({ About: false });
    this.setState({ Setting: false });
  };
  handleAboutClick = () => {
    this.setState({ About: true });
    this.setState({ Setting: false });
    document.getElementsByClassName("navbar-toggler")[0].click();
  };
  handleSettingClick = () => {
    this.setState({ Setting: true });
    this.setState({ About: false });
    document.getElementsByClassName("navbar-toggler")[0].click();
  };
  handleSwitchChange = checked => {
    this.setState({ switchChecked: checked });
  };
  handleTimeSubmit = e => {
    e.preventDefault();
    this.setState({ PomodoroTimeData: e.target[1].value });
    this.setState({ BreakTimeData: e.target[2].value });
    this.setState({ About: false });
    this.setState({ Setting: false });
    // this.forceUpdate();
  };
  handleStart = value => {
    this.setState({ started: value });
  };
  handleStop = value => {
    this.setState({ started: "" });
  };
  render() {
    return (
      <Router>
        <NavBar
          onAboutClick={this.handleAboutClick}
          onSettingClick={this.handleSettingClick}
        />
        {this.state.About ? (
          <About onCancel={this.handleCancel} />
        ) : (
          <React.Fragment />
        )}
        {this.state.Setting ? (
          <Route
            render={props => (
              <Setting
                onCancel={this.handleCancel}
                onTimeSubmit={this.handleTimeSubmit}
                {...props}
                PomodoroTimeData={this.state.PomodoroTimeData}
                BreakTimeData={this.state.BreakTimeData}
                switchChecked={this.state.switchChecked}
                handleSwitchChange={this.handleSwitchChange}
              />
            )}
          />
        ) : (
          <React.Fragment />
        )}

        <div
          id={this.state.About || this.state.Setting ? "main-blur-content" : ""}
        >
          <Route
            render={props => (
              <NavButton {...props} started={this.state.started} />
            )}
          />
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                this.state.started == "break" ? (
                  <Redirect to="/break" />
                ) : (
                  <CircularSelector
                    currentValue={this.state.PomodoroTimeData * 60 * 1000}
                    maxValue={this.state.PomodoroTimeData * 2 * 60 * 1000}
                    switchChecked={this.state.switchChecked}
                    handleStart={this.handleStart}
                    handleStop={this.handleStop}
                    //   titleValue={this.props.titleValue}
                  />
                )
              }
            />
            <Route
              exact
              path="/break"
              render={props =>
                this.state.started == "pomodoro" ? (
                  <Redirect to="/" />
                ) : (
                  <CircularSelector2
                    currentValue={this.state.BreakTimeData * 60 * 1000}
                    maxValue={this.state.BreakTimeData * 2 * 60 * 1000}
                    switchChecked={this.state.switchChecked}
                    handleStart={this.handleStart}
                    handleStop={this.handleStop}
                    //   titleValue={this.props.titleValue}
                  />
                )
              }
            />
            <Route exact path="/time" render={props => <Time />} />
            <Route render={props => <NotFound404 />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Main;
