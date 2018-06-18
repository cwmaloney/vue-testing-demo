<template>
  <h1 class="message"> {{ message || 'no message' }}</h1>
</template>

<script>
export default {
  name: 'message',

  props: {
    'message': { type: String }
  }
}
</script>

<style lang="css" scoped>

.message {
  color: blue;
}

</style>
