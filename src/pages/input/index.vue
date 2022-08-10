<template>
  <div>
    <input type="text" @input="input" maxlength="10" :value="value">
  </div>
</template>

<script>
export default {
  name: "index",
  data(){
    return {
      value:''
    }
  },
  methods: {
    input(e) {
      this.value = e.target.value.replace(/[^0-9\.]/g,'')
    }
  }
}
</script>

<style scoped>

</style>