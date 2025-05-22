<template>
  <div>
    <el-button type="primary" @click="genMini">生成图片</el-button>
    <div id="container"></div>
  </div>
</template>

<script>
import Konva from 'konva'
import qrcode from 'qrcode'
import img from '@/assets/imgs/img.png'
import bg from '@/assets/imgs/bg.png'
import miniCode from '@/assets/imgs/mini-code.png'

const createLayer = ({ img, container }) => {
  return new Promise((resolve, reject) => {
    const imageObj = new Image()
    imageObj.onload = e => {
      const { naturalWidth, naturalHeight } = e.target
      const stage = new Konva.Stage({
        container,
        width: naturalWidth,
        height: naturalHeight
      })
      const layer = new Konva.Layer()

      stage.add(layer)

      stage.on('mousemove', () => {
        const pos = stage.getPointerPosition()
        console.log(`x: ${pos.x}, y: ${pos.y}`)
      })

      resolve(layer)
    }
    imageObj.src = img
  })
}

const drawImage = ({ img, x = 0, y = 0, width, height }) => {
  return new Promise((resolve, reject) => {
    const imageObj = new Image()
    imageObj.onload = e => {
      const { naturalWidth, naturalHeight } = e.target

      const image = new Konva.Image({
        x,
        y,
        image: imageObj,
        width: width || naturalWidth,
        height: height || naturalHeight
      })

      resolve(image)
    }
    imageObj.src = img
  })
}

const drawText = ({ text, x, y, color }) => {
  return new Konva.Text({
    x,
    y,
    text,
    fontSize: 60,
    width: 700, // 设置宽度以启用换行
    fill: color,
    padding: 20,
    align: 'center',
    fontFamily: 'Calibri',
    lineHeight: 1.3
  })
}

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
    },
    async genMini() {
      const layer = await createLayer({ img: bg, container: 'container' })

      const image = await drawImage({ img: bg })

      const mini = await drawImage({ img: miniCode, x: 300, y: 730, width: 520, height: 520 })

      const text = drawText({ text: '武汉太康智云测试一二三四五六七八九大药房', x: 221, y: 430, color: '#fff' })

      layer.add(image)
      layer.add(mini)
      layer.add(text)
      layer.draw()
    }
  }
}
</script>

<style scoped lang="scss"></style>
