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
import axios from 'axios';

export default {
  name: 'index',
  data() {
    return {
      routes
    };
  },
  mounted() {
    window.onload = function() {
      console.log('load', document.readyState);
    };

    new Promise(resolve => {
      setTimeout(() => {
        console.log(1);
        resolve();
      }, 3000);
    });
    // const httpInstance = axios.create({
    //   baseURL: 'https://abc.test.com',
    //   timeout: 20000,
    //   withCredentials: true
    // });
    //
    // httpInstance.get('/text').then(() => httpInstance.get('/text1'));
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
