<template>
  <div class="wrapper">
    <el-button
      v-for="route in routes.filter(r => r.name !== 'index')"
      :key="route.name"
      @click="$router.push(route.path)"
    >
      {{ route.name }}
    </el-button>
    <div class="block" v-if="visible">Loading block</div>
    <div class="block" v-if="visible">Loading block</div>
    <div class="block" v-if="visible">Loading block</div>
    <div class="block" v-if="visible">Loading block</div>
    <div class="block" v-if="visible">Loading block</div>
    <div class="block" v-if="visible">Loading block</div>
    <div class="block" v-if="visible">Loading block</div>
    <div class="block" v-if="visible">Loading block</div>
    <div class="block" v-if="visible">Loading block</div>
    <div class="block" v-if="visible">Loading block</div>
  </div>
</template>

<script>
import { routes } from '@/router';
import { observer, observer1, observer2 } from '@/utils/performance';
import axios from 'axios';

export default {
  name: 'index',
  data() {
    return {
      routes,
      visible: false
    };
  },
  mounted() {
    console.log('mounted1', performance.now());
    //this.visible = true;
    this.$nextTick(() => {
      console.log('mounted2', performance.now());
      //this.visible = true;
    });

    let i = 0;

    while (i < 100000) {
      i = i + 1;
    }

    // new Promise(resolve => {
    //   setTimeout(() => (this.visible = true), 3000);
    // });
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  width: 70%;

  .block {
    width: 100px;
    height: 50px;
  }
}
</style>
