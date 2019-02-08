import React, { Component } from "react";
import "./css/App.css";
import ChatContainer from "./components/ChatContainer";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ChatContainer />
      </React.Fragment>
    );
  }
}

export default App;
