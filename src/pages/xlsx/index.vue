<template>
  <div>
    <div class="wrapper" ref="wrapper">
      <div class="content" ref="content">
        我是一段文本哈哈， 我是一段文本哈哈 我是一段文本哈哈， 我是一段文本哈哈， 我是一段文本哈哈， 我是一段文本哈哈，
        我是一段文本哈哈
      </div>
    </div>
  </div>
</template>

<script>
let id

export default {
  name: 'index',
  mounted() {
    this.moveContent()
  },
  beforeDestroy() {
    cancelAnimationFrame(id)
  },
  methods: {
    moveContent() {
      const wrapperEL = this.$refs.wrapper
      const contentEL = this.$refs.content

      const move = (deltaX = 0) => {
        let scrollWidth = contentEL.scrollWidth
        if (Math.abs(deltaX) < scrollWidth) {
          contentEL.style = `transform:translate(${deltaX}px, 0)`
          id = requestAnimationFrame(() => move(deltaX - 1))
        } else {
          contentEL.style = `transform:translate(${wrapperEL.scrollWidth}px,0)`
          move(wrapperEL.clientWidth)
        }
      }

      return move()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  width: 300px;
  overflow: hidden;

  .content {
    display: flex;
    white-space: nowrap;
  }
}
</style>
