import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roomID: '',
    players: [],
    cells: [],
    currentTurn: '',
    isStart: false,
    winner: {},
    size: null,
    countDown: 0,
    totalPlayers: 0
  },
  mutations: {
    setCountDown (state, time) {
      state.countDown = time
    },
    setUpdateData (state, data) {
      state.roomID = data.roomID
      state.cells = data.cells
      state.currentTurn = data.currentTurn
      state.winner = data.winner
      state.players = data.players
      state.isStart = data.isStart
      state.size = data.size
    },
    setTotalPlayers (state, data) {
      state.totalPlayers = data
    }
  },
  actions: {
    SOCKET_waiting (context, time) {
      context.commit('setCountDown', time)
    },
    SOCKET_update (context, data) {
      context.commit('setUpdateData', data)
    },
    SOCKET_totalPlayers (context, data) {
      context.commit('setTotalPlayers', data)
    }
  },
  modules: {
  }
})
