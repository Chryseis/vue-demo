<template>
  <div>
    <van-field placeholder=""></van-field>
  </div>
</template>

<script>
export default {
  name: 'field',
  data() {
    return {
      value: ''
    }
  },
  methods: {
    input(value) {
      this.value = value
    }
  }
}
</script>

<style scoped></style>
