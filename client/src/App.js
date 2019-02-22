import React, { Component } from "react";
import { Container } from "reactstrap";
import "./css/App.css";

import Header from "./component/Header";
import Name from "./component/Name";
import Chat from "./component/Chat";
import Message from "./component/Message";

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Header />
        <Name />
        <br />
        <Chat />
        <br />
        <Message />
      </Container>
    );
  }
}

export default App;
