<template>
  <div>
    <slot name="main:sub"></slot>
  </div>
</template>

<script>
export default {
  name: 'child',
  created() {
    console.log(this.$slots);
  }
};
</script>

<style scoped></style>
