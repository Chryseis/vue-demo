<template>
  <div class="img-wrapper">
    <div>
      <img
        src="https://api.doctoryan.cn/webrtc-doctor/file/download?path=presorder/2022/08/20220809/9448c76db6074378849b53c7e113f127.png"
        alt=""
      />
    </div>
    <div>
      <img
        :style="style"
        src="https://api.doctoryan.cn/webrtc-doctor/file/download?path=presorder/2022/08/20220809/9448c76db6074378849b53c7e113f127.png"
        alt=""
      />
    </div>
    <div><img :src="imgUrl" alt="" /></div>
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
      imgUrl: '',
      style: {}
    }
  },
  mounted() {
    this.calcImage()
  },
  methods: {
    calcImage() {
      const img = new Image()
      img.src = require('@/assets/imgs/prescription2.png')

      img.crossOrigin = 'anonymous'

      img.onload = () => {
        const { naturalWidth, naturalHeight } = img

        console.log('## img ', naturalWidth, naturalHeight)

        if (naturalWidth > naturalHeight) {
          const rdx = 260 / ((naturalHeight / naturalWidth) * 260)

          const height = 260 / (naturalWidth / naturalHeight)

          const currentHeight = 260 / (naturalHeight / naturalWidth)

          this.style = {
            transform: `translate(0,${(currentHeight - height) / 2}px) rotate(-90deg) scale(${rdx}) `
          }

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
  gap: 10px;

  img {
    width: 260px;
  }

  .rotate {
    transform: rotate(-90deg);
  }
}
</style>
