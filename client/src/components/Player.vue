<template>
  <div class="container text-center">
    <img
      @load="imgLoaded=true"
      v-show="imgLoaded"
      :src="player.img"
    />

    <p class="my-3 text-danger">{{player.username}}</p>

  </div>
</template>

<script>
export default {
  name: 'Player',
  props: ['player', 'currentTurn'],
  data () {
    return {
      imgLoaded: false,
      timeout: null
    }
  },
  computed: {
    getcolor () {
      if (this.player.id === this.currentTurn) {
        return '#822659'
      } else {
        return '#f8a1d1'
      }
    }
  }
}
</script>

<style>
.container {
  height: 100px;
  width: 100px;
  margin: 10px;
}

p {
  display: table;
  margin: auto;
  color: white;
  font: 17px Helvetica;
}

img {
  object-fit: cover;
  height: 70%;
  border-radius: 50%;
  border: 7px solid;
  transition: 0.1s ease-in;
}
</style>
