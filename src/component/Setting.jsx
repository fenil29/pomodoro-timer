import React, { Component } from "react";
import "./Setting.css";
import cancel from "../img/cancel.svg";
import { Form, Col, Row } from "react-bootstrap";
import Switch from "react-switch";

export class Setting extends Component {
  state = {
    PomodoroTimeData: this.props.PomodoroTimeData,
    BreakTimeData: this.props.BreakTimeData
  };
  onPomodoroTimeDataChange(e) {
    this.setState({ PomodoroTimeData: e.target.value });
  }

  onBreakTimeDataChange(e) {
    this.setState({ BreakTimeData: e.target.value });
  }
  ClickSubmit = () => {
    setTimeout(() => {
      this.ClickSubmitTimeOut1();
    }, 1);
    setTimeout(() => {
      this.ClickSubmitTimeOut2();
    }, 2);
  };

  ClickSubmitTimeOut1 = () => {
    this.props.history.push("/time");
  };
  ClickSubmitTimeOut2 = () => {
    this.props.history.replace(this.props.location.pathname);
  };
  handlerReset = () => {
    this.setState({ PomodoroTimeData: 25 });
    this.setState({ BreakTimeData: 10 });
  };

  render() {
    return (
      <div id="setting-outer-div">
        <h1 id="setting-h1">Settings</h1>
        <img
          src={cancel}
          alt="cancel"
          onClick={this.props.onCancel}
          id="cancel-button"
        />
        <div className="clear-both" />
        <div className="settings-inner-div">
          <Form id="setting-form" onSubmit={this.props.onTimeSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={5}>
                Show time in Title
              </Form.Label>
              <Col sm={7} className="form-input" id="toggle-switch">
                <Switch
                  checked={this.props.switchChecked}
                  onChange={this.props.handleSwitchChange}
                  onColor="#039ebf"
                  offColor="#83c5d3"
                  onHandleColor="#ffffff"
                  handleDiameter={15}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={25}
                  width={50}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={5}>
                Default Pomodoro Time
              </Form.Label>
              <Col sm={7} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Pomodoro Time"
                  name="PomodoroTime"
                  required
                  value={this.state.PomodoroTimeData}
                  onChange={value => this.onPomodoroTimeDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={5}>
                Default Break Time
              </Form.Label>
              <Col sm={7} className="form-input">
                <Form.Control
                  type="number"
                  placeholder="Break Time"
                  name="BreakTime"
                  required
                  value={this.state.BreakTimeData}
                  onChange={value => this.onBreakTimeDataChange(value)}
                />
              </Col>
            </Form.Group>
            <input
              type="submit"
              style={{ display: "none" }}
              id="setting-submit-button"
            />
            <div className="setting-button-div">
              <button
                onClick={this.ClickSubmit}
                className="setting-button start-button"
              >
                submit
              </button>
              <button
                type="reset"
                onClick={this.handlerReset}
                className="setting-button stop-button"
              >
                reset
              </button>
              <div className="clear-both" />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default Setting;
