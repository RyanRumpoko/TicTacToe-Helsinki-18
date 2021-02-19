<template>
  <div>
    <h1 v-if="winner.username" class="text-danger">Pemenangnya adalah: {{winner.username}}</h1>
    <h1 v-if="winner.img && !winner.username" class="text-danger">Sayang sekali kalian seri</h1>
    <h1 class="text-center" style="color: #fc8621">Room ID: {{roomID}}</h1>
    <h3 v-if="!isStart&&countDown==0" class="text-center text-danger">Waiting for players...</h3>
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
        @change="move(cell.id)"
        :canClick="cell.canClick"
        :size="size"
        :id="cell.mark"
      />
    </div>

    <div class="row justify-content-center text-warning">
      <transition name="countDown" mode="out-in">
        <h1 v-if="countDown>0" :key="countDown" id="countDown">{{countDown}}</h1>
      </transition>
    </div>

    <div class="row justify-content-center">
      <button
        v-show="(!isStart||winner!='')&&countDown==0"
        v-on:click="backToHome"
        class="col-3 btn btn-danger"
      >Keluar</button>
    </div>
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

.countDown-enter-active {
  transition: all 0.35s ease-in-out;
}

.countDown-enter {
  opacity: 0;
}

.playersList {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 20px;
  height: 100px;
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

@keyframes textAnimate {
  0% {
    background-position: -500%;
  }
  100% {
    background-position: 500%;
  }
}
</style>
