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
const mqtt = require('mqtt');
const brokerUrl = 'mqtt://45.79.53.206:1883';
const logModal = require("./models/log")



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/test", (req, res) => {
  res.send("LOL testing wooh");
});




const client = mqtt.connect(brokerUrl);

client.on('connect', function () {
  console.log('Connected to broker');
  client.subscribe('log/parameter', function (err) {
    if (err) {
      console.error('Subscription error:', err);
    } else {
      console.log('Subscribed to topic: log/parameter');
    }
  });
});

// Handle incoming messages
client.on('message', async function (topic, message) {
  // message is a buffer, so convert it to string
  // checnk for the top
  let MyData = JSON.parse(message)
  if (topic == "notification/critical") {
    // something is not ok here ....
    console.log("  disaster alert notify the users................")

  }
  if (topic == "log/parameter") {
    // there is new notification.....
    console.log(" just some log");
    // issue ya security later has to be taken into consideratopn
    try {
      const saved = await logModal.create({
        serialNumber: MyData.serialNumber,
        levelPercentage: MyData.levelPercentage,
        grossWeight: MyData.grossWeight
      })
      if(saved) {
        console.log(" just saved well..."); 
      }
    } catch (error) {
     console.log(error);
      
    }


  }
});

// Handle errors
client.on('error', function (err) {
  console.error('Connection error:', err);
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



