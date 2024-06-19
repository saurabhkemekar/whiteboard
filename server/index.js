const express = require("express");

const cors = require("cors");
const app = express();
let port = 3000;
app.use(cors());
app.use(express.static("public"));

let server = app.listen(port, () => {
  console.log("listening to  port " + port);
});
const socket = require("socket.io");
let io = socket(server, { cors: { origin: "*" } });

// listen for connections
io.on("connection", (socket) => {
  console.log("connected");

  socket.on("beginPath", (data) => {
    io.sockets.emit("beginPath", data);
  });
  socket.on("drawPath", (data) => {
    io.sockets.emit("drawPath", data);
  });
  socket.on("undoRedo", (data) => {
    io.sockets.emit("undoRedo", data);
  });
});
