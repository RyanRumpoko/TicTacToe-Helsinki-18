const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    credentials: true
  },
  allowEIO3: true
});

const cors = require('cors');

app.use(cors());
const uuid = require("uuid");
const Game = require('./game');
const port = process.env.PORT || 3000;

let games = {};
let playersCount = 0;

io.on('connection', (socket) => {
  playersCount++;
  io.emit('totalPlayers', playersCount);
  console.log(playersCount, '<<< di app.js');
  socket.on('joinGame', joinGame);
  socket.on('leaveGame', leaveGame);
  socket.on('move', handleMove);
  socket.on('disconnect', leaveGame);
  socket.on('disconnect', () => {
    playersCount--;
    io.emit('totalPlayers', playersCount);
  })
})

function joinGame({ username, img }) {
  for (index in games) {
    let game = games[index];
    if (game.canJoin) {
      this.roomName = game.name;
      game.addPlayer(this, username, img);
    }
  }
  if (!this.roomName) {
    let roomID = uuid().substring(0, 7);
    games[roomID] = new Game(roomID);
    this.roomName = roomID;
    games[roomID].addPlayer(this, username, img);
  }
}

function leaveGame() {
  if (this.roomName) {
    games[this.roomName].removePlayer(this)
    let players = games[this.roomName].sockets
    if (Object.keys(players).length === 0) {
      delete games[this.roomName]
    }
    delete this.roomName
  }
}

function handleMove(cellID) {
  games[this.roomName].move(this.id, cellID)
}

server.listen(port, () => {
  console.log('Server listening at port : ', port);
});