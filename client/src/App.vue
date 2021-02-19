<template>
  <div class="container-fluid bg-dark">
    <div class="row justify-content-center align-items-center">
      <form v-if="nameScene" @submit.prevent="joinRoom" class="position-center">
        <h1 class="text-danger fs-5" style="font-size: 35px">TicTacToe Helsinki 18</h1>
        <input v-model="username" type="text" class="form-control" placeholder="Nama Kamu" />
        <div class="row justify-content-center">
          <button class="col-6 btn btn-danger mt-1" type="submit">Mainkan</button>
        </div>
      </form>

      <board @back="onBack" v-else />
    </div>
  </div>
</template>

<script>
import Board from './components/Board'

export default {
  data () {
    return {
      nameScene: true,
      username: ''
    }
  },
  computed: {
    totalPlayers () {
      return this.$store.state.totalPlayers
    }
  },
  methods: {
    joinRoom () {
      this.$socket.emit('joinGame', {
        username: this.username || 'Hacktiv8',
        img: 'https://i.pravatar.cc/?u=' + this.username
      })
      this.nameScene = false
    },
    onBack () {
      this.$socket.emit('leaveGame')
      this.nameScene = true
    }
  },
  components: {
    Board
  }
}
</script>

<style>
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  text-align: center;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  width: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-content: center;
  float: left;
}

.position-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
