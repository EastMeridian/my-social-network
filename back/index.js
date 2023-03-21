const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { MongoClient } = require('mongodb');
const { createSocketController } = require('./controllers/SocketController');
const io = require("socket.io")(server, {
    cors: {
      origin: ["http://localhost:5173", "https://social-network-front.vercel.app"],
      methods: ["GET", "POST"]
    }
  });require('dotenv').config();
const uri = process.env.MONGODB_URI;
const port = 3000;

(async () => {
    try {
      const client = new MongoClient(uri);
      await client.connect();
      console.log('connected');
  
      const comments = client.db("sample_mflix").collection("comments");
  
      createSocketController({}, io);
      server.listen(port, () => {
        console.log(`listening on *:${3000}`);
      });  

    } catch(e) {
      console.log(e);
    }
  })()
