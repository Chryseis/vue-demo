<template>
  <div>
    <el-button type="primary" @click="open">点我</el-button>
    <el-button type="primary" @click="close">buttonCont</el-button>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui';

export default {
  name: 'index',
  data() {
    return {
      menu: {
        title: 'hello',
        content: 'world'
      }
    };
  },
  created() {
    console.log(this.menu);
  },
  methods: {
    open() {
      MessageBox.confirm('modal1 content', 'modal1', {
        center: true,
        confirmButtonText: '好',
        cancelButtonText: '不',
        beforeClose(action, instance, done) {
          switch (action) {
            case 'confirm':
              MessageBox.close();
              Message.info('hahaha');
              break;
            case 'cancel':
            case 'close':
              MessageBox.close();
              setTimeout(() => MessageBox.alert('hahah', 'modal1'), 300);
              break;
          }
        }
      });
    },
    close() {
      MessageBox.close();
    }
  }
};
</script>

<style scoped></style>
