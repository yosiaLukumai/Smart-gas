const app = require("express")();
const express = require("express");
const dbConfig = require("./db/connect");
const userRoutes = require("./routes/users");
const deviceRoutes = require('./routes/devices')
const logsRoutes = require("./routes/logs")
const cors = require("cors");
const { Server } = require('socket.io')
const http = require("http");
require("dotenv").config();
dbConfig.connectDb();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", (req, res) => {
  res.send("LOL testing wooh");
});


userRoutes.userRoutes(app);
deviceRoutes.devicesRoutes(app);
logsRoutes.logsRouters(app);


const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

io.on("connect", (socket) => {
  console.log('connected')
  socket.on("disconnect", () => {
    console.log("client disconnected..");
  })
})
server.listen(process.env.PORT, () => {
  console.log(`App running and connected to port ${process.env.PORT}`);
});
module.exports.Socket = io

