const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST'],
    credentials: true
  },
  allowEIO3: true
});

const cors = require('cors');

app.use(cors());
const uuidv1 = require("uuid/v1");
const Game = require('./game');
const port = process.env.PORT || 3000;

let games = {};
let playersCount = 0;

io.on('connection', function(socket) {
  playersCount++;
  io.emit('totalPlayers', playersCount);
  console.log(playersCount, '<<< di app.js');
  socket.on('joinGame', joinGame);
  socket.on('joinRoom', joinRoom);
})


function joinGame({
  username,
  img
}) {
  let roomID = uuidv1().substring(0, 7);
  games[roomID] = new Game(roomID);
  this.roomName = roomID;
  games[roomID].addPlayer(this, username, img);
}

function joinRoom ({
  username,
  img,
  roomID
}) {
  var game = games[roomID];
  if (game.canJoin) {
    this.roomName = game.name;
    game.addPlayer(this, username, img);
  }
}


server.listen(port, () => {
  console.log('Server listening at port : ', port);
});