<template>
  <div>
    <h1 v-if="winner.username">{{winner.username}}</h1>
    <h1 v-if="winner.img">Tie</h1>
    <h1>Room ID: {{roomID}}</h1>
    <h3 v-if="!isStart&&countDown==0">Waiting for players...</h3>
    <div class="playersList">
      <player
        v-for="player in players"
        :key="player.id"
        :player="player"
        :currentTurn="currentTurn"
      />
    </div>

    <div id="board" v-show="isStart">
      <cell
        v-for="cell in cells"
        :key="cell.id"
        :img="cell.img"
        v-on:change="move(cell.id)"
        :canClick="cell.canClick"
        :size="size"
        :id="cell.mark"
      />
    </div>

    <transition name="countDown" mode="out-in">
      <h1 v-if="countDown>0" :key="countDown" id="countDown">{{countDown}}</h1>
    </transition>

    <button
      v-show="(!isStart||winner!='')&&countDown==0"
      v-on:click="backToHome"
      class="btn bbtn"
    >BACK</button>
  </div>
</template>

<script>
import Cell from './Cell'
import Player from './Player'

export default {
  name: 'board',
  computed: {
    countDown () {
      return this.$store.state.countDown
    },
    roomID () {
      return this.$store.state.roomID
    },
    cells () {
      return this.$store.state.cells
    },
    currentTurn () {
      return this.$store.state.currentTurn
    },
    winner () {
      return this.$store.state.winner
    },
    players () {
      return this.$store.state.players
    },
    isStart () {
      return this.$store.state.isStart
    },
    size () {
      return this.$store.state.size
    }
  },
  methods: {
    move (id) {
      this.$socket.emit('move', id)
    },
    backToHome () {
      this.$emit('back')
    }
  },
  components: {
    Cell,
    Player
  }
}
</script>

<style>
#countDown {
  font-size: 200px;
  margin: 0;
  user-select: none;
}

.overlay-enter-active {
  transition: all 0.3s ease-in-out;
  transition-delay: 1s;
}
.overlay-enter {
  opacity: 0;
  position: absolute;
  transform: scale(0);
  transform: rotate(90deg);
}

.countDown-enter-active {
  transition: all 0.35s ease-in-out;
}
.countDown-enter {
  opacity: 0;
}
.bbtn {
  width: 40%;
  margin: 20px 10px;
  padding: 0;
}
.playersList {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 20px;
  height: 100px;
}
.overlay img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
.overlay {
  position: relative;
  top: -100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

#board {
  background: rgba(0, 0, 0, 0.1);
  margin: auto;
  margin-bottom: 10px;
  width: 350px;
  height: 350px;

  display: flex;
  flex-wrap: wrap;

  border-style: solid;
  border-width: 1px;
  border-color: black;
  overflow: hidden;
}

h3 {
  overflow: hidden;
  background: linear-gradient(90deg, #1a535c, #4ecdc4, #1a535c);
  background-repeat: no-repeat;
  background-size: 85%;
  animation: textAnimate 2s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0.2);
}
h1 {
  margin: 10px 0;
}
@keyframes textAnimate {
  0% {
    background-position: -500%;
  }
  100% {
    background-position: 500%;
  }
}
</style>
