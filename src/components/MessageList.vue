<template>
  <div class="message-list">
    <h1>Messages</h1>
    <ul>
      <li v-for="message in messages" :key="message.id">
        {{ message.id }}: {{ message.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'message-list',
  props: [
    'messages'
  ]
}
</script>

<style lang="css" scoped>
.message-list {
  border: solid;
  margin: 10px 0;
  padding: 5px;
  }
</style>
