<template>
  <div class="container-fluid position-center">
    <div class="row justify-content-center">
      <form v-if="nameScene" @submit.prevent="joinRoom">
        <h1 class="text-danger">TicTacToe Helsinki 18</h1>
        <input v-model="username" type="text" class="form-control" placeholder="Nama Kamu" />
        <div class="row justify-content-center">
          <button class="col-6 btn btn-danger mt-1" type="submit">Play</button>
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
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.position-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
