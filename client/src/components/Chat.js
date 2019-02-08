import React from "react";

export default function Chat(props) {
  return (
    <div style={{ display: "flex" }}>
      <h6> {props.message.username} </h6>:<p>{props.message.message}</p>
    </div>
  );
}
