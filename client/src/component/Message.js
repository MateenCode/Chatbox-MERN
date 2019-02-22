import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
function Message() {
  return (
    <Form>
      <FormGroup>
        <Input type="textarea" name="text" id="exampleText" />
      </FormGroup>
    </Form>
  );
}

export default Message;
