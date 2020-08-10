<template>
  <child>
    <template v-slot:main:sub>
      haha
    </template>
  </child>
</template>

<script>
import child from './child';
export default {
  name: 'index',
  components: {
    child
  }
};
</script>

<style scoped></style>
