import Vue from 'vue'
import VueSocketIo from 'vue-socket.io'
import store from '../store'

const socket = new VueSocketIo({
  debug: true,
  connection: 'https://group-project-18-tic-tac-toe.herokuapp.com/',
  vuex: {
    store,
    actionPrefix: 'SOCKET_'
  }
})

Vue.use(socket)
