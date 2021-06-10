<template>
  <div class="wrapper">
    <el-button
      v-for="route in routes.filter(r => r.name !== 'index')"
      :key="route.name"
      @click="$router.push(route.path)"
    >
      {{ route.name }}
    </el-button>
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
      routes
    };
  },
  mounted() {
    console.log('mounted');
    this.$nextTick(() => {
      console.log('mounted2', performance.now());
    });
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
}
</style>
