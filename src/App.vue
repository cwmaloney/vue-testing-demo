<template>
  <div id="app">
    <counter :initialCount="0"/>
    <message-toggle message1="message one" message2="message two"/>
    <message-list :messages="messages" />
  </div>
</template>

<script>
import Counter from './components/Counter.vue'
import MessageToggle from './components/MessageToggle.vue'
import MessageList from './components/MessageList.vue'

export default {
  data () {
    return {
      messages: [
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
