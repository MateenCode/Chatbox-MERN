import React, { Component } from "react";
import { Provider } from "./context/context";
import "./css/App.css";

import Main from "./components/Main";

class App extends Component {
  render() {
    return (
      <Provider>
        <Main />
      </Provider>
    );
  }
}

export default App;
