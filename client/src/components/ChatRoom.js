import React, { Component } from "react";
import { Consumer } from "../context/context";
import {} from "reactstrap";
import Chat from "./Chat";

export default class ChatRoom extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { messages } = value;
          return (
            <React.Fragment>
              {messages.map(message => {
                return <Chat key={message._id} message={message} />;
              })}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}
