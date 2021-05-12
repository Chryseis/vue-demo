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
const XLSX = require('xlsx');

function readWorkbookFromLocalFile(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    if (xhr.status === 200) {
      const data = new Uint8Array(xhr.response);
      const workbook = XLSX.read(data, { type: 'array' });
      if (callback) callback(workbook);
    }
  };
  xhr.send();
}

readWorkbookFromLocalFile('/test.xlsx', workbook => workbook);

export default {
  name: 'index',
  mounted() {
    this.moveContent();
  },
  methods: {
    moveContent() {
      const wrapperEL = this.$refs.wrapper;
      const contentEL = this.$refs.content;

      console.log(wrapperEL.clientWidth, contentEL.scrollWidth);

      const move = (deltaX = 0) => {
        let scrollWidth = contentEL.scrollWidth;
        if (Math.abs(deltaX) < scrollWidth) {
          contentEL.style = `transform:translate(${deltaX}px, 0)`;
          requestAnimationFrame(() => move(deltaX - 1));
        } else {
          contentEL.style = `transform:translate(${wrapperEL.scrollWidth}px,0)`;
          move(wrapperEL.clientWidth);
        }
      };

      return move();
    }
  }
};
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
