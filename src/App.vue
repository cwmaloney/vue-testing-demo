<template>
  <div id="app">
    <counter :initialCount="0"/>
    <message-toggle />
    <message-list :items="items" />
  </div>
</template>

<script>
import Counter from './components/Counter.vue'
import MessageToggle from './components/MessageToggle.vue'
import MessageList from './components/MessageList.vue'

export default {
  data () {
    return {
      items: [
        {id: 1, message: 'item 1'},
        {id: 2, message: 'item 2'},
        {id: 3, message: 'item 3'}
      ]
    }
  },

  components: {
    Counter,
    MessageToggle,
    MessageList
  }
}
</script>

<style>
#app {
  color: blueviolet;
}
</style>
