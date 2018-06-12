<template>
<div class="message-list">
  <h1>Messages:</h1>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.id }}: {{ item.message }}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'list',
  props: [
    'items'
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
