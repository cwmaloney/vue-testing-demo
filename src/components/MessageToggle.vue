<template>
  <div class="message-toggle">
    <message :message="message"></message>
    <button @click="changeMessage">
      Change message
    </button>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'message-toggle',

  data: () => ({
    message: null
  }),

  methods: {
    changeMessage () {
      this.message = (this.message === 'message1' ? 'message2' : 'message1');
    }
  },

  components: {
    Message
  }
}
</script>


<style lang="css" scoped>
.message-toggle {
  border: solid;
  margin: 10px 0;
  padding: 5px;
}
</style>
