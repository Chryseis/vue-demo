<template>
  <div>{{ menu.title }}{{ menu.content }}</div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      menu: {
        title: 'hello',
        content: 'world'
      }
    };
  },
  created() {
    console.log(this.menu);
  }
};
</script>

<style scoped></style>
