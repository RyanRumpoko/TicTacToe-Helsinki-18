<template>
  <div>
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
      v-show="(!isStart||winnerImg!='')&&countDown==0"
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
  data () {
    return {
      roomID: '',
      players: [],
      cells: [],
      currentTurn: '',
      isStart: false,
      winner: null,
      size: null,
      countDown: 0
    }
  },
  sockets: {
    waiting (time) {
      this.countDown = time
    },
    update (data) {
      this.roomID = data.roomID
      this.cells = data.cells
      this.currentTurn = data.currentTurn
      this.winner = data.winner
      this.players = data.players
      this.isStart = data.isStart
      this.size = data.size
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

</style>
