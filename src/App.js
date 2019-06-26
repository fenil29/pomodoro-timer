import React from "react";

import "./App.css";
import Main from "./component/Main.jsx";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Route component={Main} />
      </Router>
    </div>
  );
}

export default App;
