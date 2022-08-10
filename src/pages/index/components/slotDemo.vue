<template>
  <div>
    Slot Demo
    <slot :age="age" :sex="sex"></slot>
  </div>
</template>

<script>
export default {
  name: 'slotDemo',
  data() {
    return {
      name: 'allen',
      sex: 'male',
      age: '28'
    }
  }
}
</script>

<style scoped></style>
