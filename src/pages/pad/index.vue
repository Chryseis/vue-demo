<template>
  <div style="display: flex; justify-content: center">
    <div @mousedown="log" @click="log" style="position: relative; width: 500px; height: 200px">
      <div
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none"
        v-show="placeholderVisible"
      >
        hahaha
      </div>
      <VueSignaturePad style="border: 1px solid #000" width="500px" height="200px" ref="signaturePad" />
    </div>
    <div>
      <button @click="save">Save</button>
      <button @click="undo">Undo</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSignaturePad from 'vue-signature-pad'

Vue.use(VueSignaturePad)

export default {
  name: 'index',
  data() {
    return {
      placeholderVisible: true
    }
  },
  methods: {
    undo() {
      this.$refs.signaturePad.undoSignature()
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      console.log(isEmpty)
      console.log(data)
    },
    log() {
      this.placeholderVisible = false
      console.log('write')
    }
  }
}
</script>

<style lang="less" scoped></style>
