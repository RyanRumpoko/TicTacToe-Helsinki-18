<template>
  <div class="cell" v-on:click="check" style="width: 33%; height: 33%;">
    <transition name="playerImg">
      <img v-if="img!=''" :src="img" style="width: 80%; height: 80%; opacity: 1;" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: ['img', 'canClick', 'size', 'id'],
  methods: {
    check () {
      if (this.canClick) {
        this.$emit('change')
      }
    }
  }
}
</script>

<style>
.playerImg-enter-active {
  transition: all 0.2s;
}

.playerImg-enter {
  opacity: 0;
  transform: scale(0);
}

img {
  object-fit: cover;
  border-radius: 50%;
  transition: 0.1s ease-in;
}

.cell {
  width: calc(100% / 3);
  height: calc(100% / 3);

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  border-style: solid;
  border-width: 1px;
  border-color: black;

  user-select: none;
}

.cell:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
