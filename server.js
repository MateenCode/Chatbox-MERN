const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let Message = mongoose.model("Message", {
  username: String,
  message: String
});

app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post("/messages", async (req, res) => {
  try {
    let message = new Message(req.body);

    let savedMessage = await message.save();
    console.log("saved");

    let censored = await Message.findOne({ message: "badword" });
    if (censored) await Message.remove({ _id: censored.id });
    else io.emit("message", req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.log("error", error);
  } finally {
    console.log("Message Posted");
  }
});

app.delete("/clear", (req, res) => {
  Message.deleteMany()
    .then(() => io.emit("cleared"))
    .catch(err => console.log(err));
});

io.on("connection", () => {
  console.log("a user is connected");
});

const db = "mongodb://mateen:kazia12@ds225375.mlab.com:25375/chatbox";

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
