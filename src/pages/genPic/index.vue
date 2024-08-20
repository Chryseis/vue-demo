<template>
  <div>
    <el-button type="primary" @click="genQR">生成图片</el-button>
    <div id="container"></div>
  </div>
</template>

<script>
import Konva from 'konva'
import qrcode from 'qrcode'
import img from '@/assets/imgs/img.png'
export default {
  name: 'genPic',
  methods: {
    genQR() {
      qrcode.toCanvas(
        JSON.stringify({ storeId: 123, name: '张三' }),
        {
          width: 100,
          errorCorrectionLevel: 'H',
          margin: 0
        },
        (err, canvas) => {
          if (err) {
            console.error(err)
            return
          }

          const imageObj = new Image()
          imageObj.onload = e => {
            const { naturalWidth, naturalHeight } = e.target
            const stage = new Konva.Stage({
              container: 'container',
              width: naturalWidth,
              height: naturalHeight
            })
            const layer = new Konva.Layer()

            stage.add(layer)

            const image = new Konva.Image({
              x: 0,
              y: 0,
              image: imageObj,
              width: naturalWidth,
              height: naturalHeight
            })
            const qrImg = new Konva.Image({
              x: 0,
              y: 0,
              image: canvas,
              width: 100,
              height: 100
            })

            layer.add(image)
            layer.add(qrImg)
            layer.draw()
          }
          imageObj.src = img
        }
      )
    }
  }
}
</script>

<style scoped lang="scss"></style>
