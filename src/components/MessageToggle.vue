<template>
  <div class="message-toggle">
    <message :message="message"></message>
    <button id="change-button" @click="changeMessage">
      Change Message
    </button>
  </div>
</template>

<script>
import Message from './Message.vue'

export default {
  name: 'message-toggle',

  props: {
    'message1': { type:String, required: true },
    'message2': { type:String, required: true }
  },

  data() {
    return {
      message: this.message1
    }
  },

  methods: {
    changeMessage () {
      this.message = (this.message === this.message1 ? this.message2 : this.message1);
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
