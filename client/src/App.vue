<template>
  <div>
    <transition mode="out-in" name="fade" appear>
      <form class="form" v-if="nameScene" v-on:submit.prevent="joinRoom">
        <h1>TicTacToe Helsinki 18</h1>
        <input v-model="username" type="text" placeholder="YourName" />
        <input v-model="roomId" type="text" placeholder="room id" />
        <button class="btn" type="submit">Play</button>
      </form>

      <board @back="onBack" v-else />
    </transition>
  </div>
</template>

<script>
import Board from './components/Board'

export default {
  data () {
    return {
      nameScene: true,
      totalPlayers: 0,
      username: '',
      roomId: ''
    }
  },
  sockets: {
    connect () {
      console.log('-------connected')
      console.log(this.totalPlayers, '<<< di app.vue')
      // this.$socket.emit('userJoin', this.name)
    },
    totalPlayers (data) {
      this.totalPlayers = data
    }
  },
  methods: {
    joinRoom () {
      if (this.roomId) {
        this.$socket.emit('joinRoom', {
          username: this.username,
          img: 'https://i.pravatar.cc/?u=' + this.username,
          roomID: this.roomId
        })
      } else {
        this.$socket.emit('joinGame', {
          username: this.username || 'Hacktiv8',
          img: 'https://i.pravatar.cc/?u=' + this.username
        })
      }
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  color: #f7fff7;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
}
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  float: left;
  width: 100%;
  background: #5c341a;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
