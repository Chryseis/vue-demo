<template>
  <div @click="$emit('change')">iuyuqiwoeqioueqe</div>
</template>

<script>
export default {
  name: 'componentA',
  props: {
    text: {
      type: String,
      default: 'hahahha'
    }
  },
  mounted() {
    console.log('mounted')
  },
  activated() {
    console.log('activated')
  }
}
</script>

<style scoped></style>
