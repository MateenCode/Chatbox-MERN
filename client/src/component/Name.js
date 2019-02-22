import React, { Component } from "react";
import { InputGroup, Input } from "reactstrap";

export default class Name extends Component {
  render() {
    return (
      <InputGroup>
        <Input placeholder="username" />
      </InputGroup>
    );
  }
}
