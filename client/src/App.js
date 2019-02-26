import React, { Component } from "react";
import axios from "axios";
import "./css/App.css";

class App extends Component {
  state = {
    username: "",
    message: "",
    messages: []
  };

  componentDidMount = () => {
    axios.get("http://localhost:3000/messages").then(res => {
      this.setState({
        messages: res.data
      });
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let newMessage = {
      username: this.state.username,
      message: this.state.message
    };
    this.setState({
      messages: [newMessage, ...this.state.messages]
    });

    axios
      .post("/messages", {
        username: this.state.username,
        message: this.state.message
      })
      .then(() => {
        this.setState({
          username: "",
          message: ""
        });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-sm-12">
            <form onSubmit={this.handleSubmit}>
              <h1 className="text-center">
                ChatBox
                <button id="clear" className="btn btn-danger ml-2">
                  Clear
                </button>
              </h1>
              <div id="chat">
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  id="username"
                  className="form-control"
                  placeholder="Enter name..."
                />
                <br />
                <div className="card">
                  <div id="messages" className="card-block">
                    {this.state.messages.map(message => (
                      <span key={message._id}>
                        {message.username}: {message.message}
                        <br />
                      </span>
                    ))}
                  </div>
                </div>
                <br />
                <textarea
                  name="message"
                  value={this.state.message}
                  onChange={this.handleChange}
                  id="textarea"
                  className="form-control"
                  placeholder="Enter message..."
                />
                <button
                  type="button"
                  className="btn btn-info float-right m-2"
                  onClick={this.handleSubmit}
                >
                  Enter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
