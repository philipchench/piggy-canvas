const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors"); // no need if html served from same node server

const app = express();

// this can directly serve the frontend and other static files
app.use(express.static(__dirname + "/frontend"));

// don't need any more???? ^^ automatically detects static files???
// app.get("/", (req, res) => {
//   res.sendFile("index.html", { root: __dirname });
// });

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.sockets.on("connection", (socket) => {
  console.log(socket.id + " is connected.");

  // receive drawn pig data from a client
  socket.on("drawPig", (data) => {
    socket.broadcast.emit("receiveDrawPig", data);
  });
  // client resets canvas
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
