import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./CircularSelector.css";
import { CircleSlider } from "react-circle-slider";
import Timer from "react-compound-timer";
import {
 
  Redirect
} from "react-router-dom";

export class CircularSelector extends Component {
  state = {
    value: this.props.currentValue,
    selector: true,
    dataForProgress: 0,
    paused: false,
    TimestampOnStart: 0,
    firstTimePaused: true,
    remainingTime: 0
  };
  dataForProgressVar = 0;
  handleChange = value => {
    this.setState({ value });
  };
  componentWillUnmount() {
    if (!this.state.selector) {
      localStorage.setItem("Timestamp", this.state.TimestampOnStart);
      localStorage.setItem(
        "value",
        Math.floor((this.state.value / 1000 / 60) << 0) * 60 * 1000
      );
      localStorage.setItem(
        "remainingTime",
        this.dataForProgressVar < 0 ? 0 : this.dataForProgressVar
      );
      localStorage.setItem("selector", this.state.selector);
      localStorage.setItem("paused", this.state.paused);
    } else {
      // localStorage.clear();
      localStorage.removeItem("started");
      localStorage.removeItem("Timestamp");
      localStorage.removeItem("value");
      localStorage.removeItem("remainingTime");
      localStorage.removeItem("selector");
      localStorage.removeItem("paused");
    }
  }
  componentDidUpdate = () => {
  };
  componentDidMount() {
    this.titleValue();
    if (localStorage.getItem("selector")) {
      this.setState({ selector: false });
      this.setState({ value: Number(localStorage.getItem("value")) });
    }
    if (localStorage.getItem("Timestamp")) {
      this.setState({
        TimestampOnStart: Number(localStorage.getItem("Timestamp"))
      });
    }
    if (localStorage.getItem("paused")) {
      this.setState({ paused: localStorage.getItem("paused") == "true" });
   
    }
    window.addEventListener("beforeunload", ev => {
      this.componentWillUnmount();
    });
    setTimeout(() => {
      this.pauseOnStart();
    }, 1);
  }
  pauseOnStart = () => {
    if (this.state.paused && !this.state.selector) {
      document.getElementById("paused-button-forjs").click();
    }
  };
  titleValue = time => {
    if (this.props.switchChecked) {
      !this.state.selector
        ? ReactDOM.render(
            <React.Fragment>{time}</React.Fragment>,
            document.getElementById("title")
          )
        : ReactDOM.render(
            <React.Fragment>Pomodoro Timer</React.Fragment>,
            document.getElementById("title")
          );
    } else {
      ReactDOM.render(
        <React.Fragment>Pomodoro Timer</React.Fragment>,
        document.getElementById("title")
      );
    }
  };
  dataForProgressFunction = data => {
    this.dataForProgressVar = data;
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        {/* {localStorage.getItem("started") == "pomodoro" ? (
          <Redirect to="/" />
        ) : (
          <React.Fragment />
        )} */}
        {!this.state.selector ? (
          <React.Fragment>
            <Timer
              initialTime={
                //we are using math floor because our value slider has presition of milisecon and we only require presition of minutes if we consider millisecond precision ther it will overcount
                //we require precision of minute because we are subtracting from selected values and selected values has presition of minutes
                // (localStorage.getItem("Timestamp")
                //                         ? this.state.value -
                //                         (Date.now() - Number(localStorage.getItem("Timestamp")))
                //                         : Math.floor((this.state.value / 1000 / 60) << 0) * 60 * 1000 >=
                //                         0)
                //                         ? localStorage.getItem("Timestamp")
                //                           ? this.state.value -
                //                           (Date.now() - Number(localStorage.getItem("Timestamp")))
                //                           : this.state.value
                //   : 0

                localStorage.getItem("remainingTime") &&
                localStorage.getItem("paused") &&
                localStorage.getItem("paused") == "true"
                  ? Number(localStorage.getItem("remainingTime"))
                  : localStorage.getItem("Timestamp")
                  ? Math.floor((this.state.value / 1000 / 60) << 0) *
                      60 *
                      1000 -
                      (Date.now() - Number(localStorage.getItem("Timestamp"))) >
                    0
                    ? Math.floor((this.state.value / 1000 / 60) << 0) *
                        60 *
                        1000 -
                      (Date.now() - Number(localStorage.getItem("Timestamp")))
                    : 0
                  : Math.floor((this.state.value / 1000 / 60) << 0) * 60 * 1000

                // (localStorage.getItem("Timestamp")
                // ? Math.floor((this.state.value / 1000 / 60) << 0) * 60 * 1000 -
                //   (Date.now() - Number(localStorage.getItem("Timestamp")))
                // : Math.floor((this.state.value / 1000 / 60) << 0) * 60 * 1000 >=
                //   0)
                //   ? localStorage.getItem("Timestamp")
                //     ? Math.floor((this.state.value / 1000 / 60) << 0) *
                //         60 *
                //         1000 -
                //       (Date.now() - Number(localStorage.getItem("Timestamp")))
                //     : Math.floor((this.state.value / 1000 / 60) << 0) *
                //       60 *
                //       1000
                //   : 0
              }
              direction="backward"
              // startImmediately={false}
              onResume={() => this.setState({ paused: false })}
              
            >
              {({ start, resume, pause, stop, reset, timerState, m }) => (
                <React.Fragment>
                  {/* <div>
                  <Timer.Days /> days
                  <Timer.Hours /> hours
                  <Timer.Minutes /> minutes
                  <Timer.Seconds /> seconds
                  <Timer.Milliseconds /> milliseconds
                </div> */}
                  <div id="outer-div">
                    <div className="circular-selector" id="rotate">
                      {/* <Timer.Hours  formatValue={valueM => ()}/> */}
                      <Timer.Hours
                        formatValue={valueH => (
                          <Timer.Minutes
                            formatValue={valueM => (
                              <Timer.Seconds
                                formatValue={valueS => (
                                  <React.Fragment>
                                    <CircleSlider
                                      value={
                                        (valueH * 60 * 60 +
                                          valueM * 60 +
                                          valueS) *
                                        1000
                                      }
                                      size={400}
                                      // showTooltip={true}
                                      gradientColorFrom="#02C0E8"
                                      gradientColorTo="#01F0D1"
                                      knobRadius={0}
                                      progressWidth={20}
                                      circleWidth={15}
                                      progressColor="#6656B6"
                                      tooltipColor="#6ab6e1"
                                      tooltipSize={20}
                                      min={1}
                                      max={
                                        Math.floor(
                                          (this.state.value / 1000 / 60) << 0
                                        ) *
                                        60 *
                                        1000
                                      }
                                      onChange={this.handleChange}
                                      disabled={true}
                                    />

                                    {timerState == "STOPPED" ||
                                    (valueS == 0 &&
                                      valueH == 0 &&
                                      valueM == 0) ? (
                                      <p id="time-completed">COMPLETED</p>
                                    ) : (
                                      <p id="time">
                                        {valueS >= 0 &&
                                        valueH >= 0 &&
                                        valueM >= 0
                                          ? valueS < 10
                                            ? valueH * 60 +
                                              valueM +
                                              ":" +
                                              "0" +
                                              valueS
                                            : valueH * 60 +
                                              valueM +
                                              ":" +
                                              valueS
                                          : ""}
                                      </p>
                                    )}
                                    {this.titleValue(
                                      timerState == "STOPPED"
                                        ? "COMPLETED"
                                        : valueS >= 0 &&
                                          valueH >= 0 &&
                                          valueM >= 0
                                        ? valueS < 10
                                          ? valueH * 60 +
                                            valueM +
                                            ":" +
                                            "0" +
                                            valueS
                                          : valueH * 60 + valueM + ":" + valueS
                                        : ""
                                    )}
                                    {this.dataForProgressFunction(
                                      (valueH * 60 * 60 +
                                        valueM * 60 +
                                        valueS) *
                                        1000
                                    )}
                                  </React.Fragment>
                                )}
                              />
                            )}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <button
                    style={{ display: "none" }}
                    id="paused-button-forjs"
                    onClick={pause}
                  />

                  <div id="button-div">
                    {!this.state.paused ? (
                      <React.Fragment>
                        <button
                          className="selector-button start-button"
                          id="pause-button"
                          onClick={() => {
                            pause();
                            this.setState({ paused: true });
                          }}
                        >
                          Pause
                        </button>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <button
                          className="selector-button start-button"
                          id=""
                          onClick={resume}
                        >
                          Resume
                        </button>
                      </React.Fragment>
                    )}

                    <button
                      className="selector-button stop-button"
                      id=""
                      onClick={() => {
                        this.setState({ selector: true });
                        this.setState({ value: this.props.currentValue });
                        this.setState({ TimestampOnStart: 0 });
                        this.setState({ paused: false });
                        this.titleValue();
                        this.props.handleStop("pomodoro");
                        // localStorage.clear();
                        localStorage.removeItem("started");
                        localStorage.removeItem("Timestamp");
                        localStorage.removeItem("value");
                        localStorage.removeItem("remainingTime");
                        localStorage.removeItem("selector");
                        localStorage.removeItem("paused");
                      }}
                    >
                      STOP
                    </button>
                  </div>
                </React.Fragment>
              )}
            </Timer>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div id="outer-div">
              <div className="circular-selector">
                <CircleSlider
                  value={this.props.currentValue}
                  size={400}
                  // showTooltip={true}
                  gradientColorFrom="#02C0E8"
                  gradientColorTo="#01F0D1"
                  knobRadius={15}
                  progressWidth={20}
                  circleWidth={15}
                  progressColor="#6656B6"
                  tooltipColor="#6ab6e1"
                  tooltipSize={20}
                  min={1 * 60 * 1000}
                  max={this.props.maxValue + 1 * 60 * 1000}
                  onChange={this.handleChange}
                  // disabled={true}
                />
              </div>
              <p id="time">
                {// this.state.value
                Math.floor((this.state.value / 1000 / 60) << 0) + ":" + "00"
                // Math.floor((this.state.value/1000) % 60)
                }
              </p>
            </div>
            <div id="button-div">
              <button
                className="selector-button start-button"
                id=""
                onClick={() => {
                  this.setState({ selector: false });
                  this.setState({ TimestampOnStart: Date.now() });
                  // localStorage.setItem("started", "pomodoro");
                  // this.setState({ started: "pomodoro" });
                  this.props.handleStart("break");
                }}
              >
                START
              </button>
              <button className="selector-button stop-button" id="">
                STOP
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default CircularSelector;
