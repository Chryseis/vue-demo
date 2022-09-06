<template>
  <div>
    <el-button type="primary" @click="view">预览</el-button>
    <image-viewer :z-index="2000" :initial-index="0" v-if="dialogVisible" :on-close="closeViewer" :url-list="imgUrls" />
  </div>
</template>

<script>
import imageViewer from './image-viewer'

console.log('## img', require('@/assets/imgs/img1.png'))

export default {
  name: 'index',
  components: {
    imageViewer
  },
  data() {
    return {
      dialogVisible: false,
      imgUrls: [
        { url: require('@/assets/imgs/img1.png'), uploadTime: '2022-08-22 14:20:00' },
        { url: require('@/assets/imgs/img2.png'), uploadTime: '2022-08-23 16:20:00' },
        { url: require('@/assets/imgs/img3.png'), uploadTime: '2022-08-21 09:20:00' }
      ]
    }
  },
  methods: {
    view() {
      this.dialogVisible = true
    },
    closeViewer() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped></style>
