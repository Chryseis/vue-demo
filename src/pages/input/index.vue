<template>
  <div>
    <div class="wrapper">
      <div class="multi-line-ellipsis">{{ obj.text }}</div>
      <span>label</span>
      <el-select v-model="value">
        <el-option :value="0" label="哈哈"></el-option>
        <el-option :value="1" label="呵呵"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      value: 0
    }
  },
  computed: {
    obj() {
      return {
        text: this.value === 0 ? '哈哈' : '呵呵'
      }
    }
  },
  mounted() {
    this.request()
  },
  methods: {
    input(e) {
      this.value = e.target.value.replace(/[^0-9\.]/g, '')
    },
    request() {
      fetch('https://static.qa.91jkys.com/f2e/drugstore-prescription-admin-pc/2.2.76/css/app.2519fc4c.css', {
        headers: {
          accept: 'application/json, text/plain, */*',
          'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          'sec-ch-ua': '""',
          'sec-ch-ua-mobile': '?1',
          'sec-ch-ua-platform': '""',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          token: '123123123'
        },
        referrer: 'https://itm.qa.91jkys.com/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
}

.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 200px;
  -webkit-line-clamp: 3; /* 显示的行数 */
  text-overflow: ellipsis;
  position: relative;
  word-break: break-all;
  text-align: left;
}

//.multi-line-ellipsis::after {
//  content: '... 查看更多'; /* 你想要添加的文案 */
//  position: absolute;
//  bottom: 0;
//  right: 0;
//  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%); /* 渐变遮罩，可选 */
//  /* 样式定义 */
//  color: #3498db; /* 文字颜色 */
//  font-size: 14px; /* 字体大小 */
//  padding-left: 5px; /* 左边距 */
//}
</style>
