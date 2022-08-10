<template>
  <div class="img-wrapper">
    <img src="@/assets/imgs/prescription2.png" alt="" />
    <img class="rotate" src="@/assets/imgs/prescription2.png" alt="" />
    <img :src="imgUrl" alt="" />
  </div>
</template>

<script>
const createCanvas = (w, h) => {
  const canvas = document.createElement('canvas')

  canvas.width = w

  canvas.height = h

  return canvas
}

export default {
  name: 'index',
  data() {
    return {
      imgUrl: ''
    }
  },
  mounted() {
    this.calcImage()
  },
  methods: {
    calcImage() {
      const img = new Image()
      img.src = require('@/assets/imgs/prescription2.png')

      img.onload = () => {
        const { naturalWidth, naturalHeight } = img

        if (naturalWidth > naturalHeight) {
          const canvas = createCanvas(naturalWidth, naturalWidth)

          const ctx = canvas.getContext('2d')

          ctx.translate(naturalWidth / 2, naturalWidth / 2)

          ctx.rotate(-Math.PI / 2)

          ctx.drawImage(img, -naturalWidth / 2, naturalWidth / 2 - naturalHeight)

          ctx.save()

          const canvas2 = createCanvas(naturalHeight, naturalWidth)

          const ctx2 = canvas2.getContext('2d')

          ctx2.drawImage(
            canvas,
            naturalWidth - naturalHeight,
            0,
            naturalHeight,
            naturalWidth,
            0,
            0,
            naturalHeight,
            naturalWidth
          )
          this.imgUrl = canvas2.toDataURL('image/png')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  img {
    width: 260px;
  }

  .rotate {
    transform: rotate(-90deg);
  }
}
</style>
