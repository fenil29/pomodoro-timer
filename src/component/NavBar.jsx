import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import "./NavBar.css";
window.onhashchange = function() {
};
export class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="light"
          variant="light"
          id="main-nav-bar"
        >
          <Container>
            <Navbar.Brand>Pomodoro Timer</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto" />
              <Nav>
                <div onClick={this.props.onSettingClick}>
                  <Nav.Link>Settings</Nav.Link>
                </div>

                <div onClick={this.props.onAboutClick}>
                  <Nav.Link>About</Nav.Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
