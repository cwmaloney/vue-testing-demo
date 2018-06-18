<template>
	<div class="counter">
	  {{ count }}
	  <button id="increment-button" @click="increment">Increment</button>
	  <button id="decrement-button" @click="decrement">Decrement</button>
	</div>
</template>

<script>
export default {
  data () {
    return {
      count: 0
    };
  },

  methods: {
    increment () {
      this.count++;
    },
    decrement () {
      this.count--;
    }
  }
}
</script>

<style lang="css" scoped>
.counter {
  border: solid;
  margin: 10px 0;
  padding: 5px;
}
</style>
