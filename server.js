const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const socket = require("socket.io");

// Routes Requires
const message = require("./routes/api/message");

const app = express();
const server = http.createServer(app);

// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

//Socket Connection
const io = socket(server);

// create a connection
io.on("connection", () => {
  console.log("User connected");
});

// Use Routes
app.use("/api/", message);

// @route   Post api/message
// @desc    post new message
// @access  Public
app.post("/api/message", (req, res) => {
  let message = new Message({
    username: req.body.username,
    message: req.body.message
  });
  message.save(err => {
    if (err) sendStatus(500);
    io.emit("message", req.body.username, req.body.message);
    res.sendStatus(200);
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//Server Connection
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`));
