import React from "react";
import { Button } from "reactstrap";

function Header(props) {
  return (
    <div className="text-center">
      <h2 className="display-3">
        ChatBox <Button color="danger">Clear</Button>
      </h2>
    </div>
  );
}

export default Header;
