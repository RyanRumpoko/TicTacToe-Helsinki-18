import Vue from 'vue'
import VueSocketIo from 'vue-socket.io'
// import store from '../store'

const socket = new VueSocketIo({
  debug: true,
  connection: 'http://localhost:3000'
  // vuex: {
  //   store,
  //   actionPrefix: 'SOCKET_'
  // }
})

Vue.use(socket)
