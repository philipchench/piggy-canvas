const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.get("/", (req, res) => {
  res.send("Pigs are cool.");
});

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

io.sockets.on("connection", (socket) => {
  console.log(socket.id + " is connected.");

  socket.on("drawPig", (data) => {
    socket.broadcast.emit("receiveDrawPig", data);
  });

  socket.on("reset", () => {
    socket.broadcast.emit("receiveReset");
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected.");
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
