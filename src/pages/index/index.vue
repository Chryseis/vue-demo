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

export default {
  name: 'index',
  data() {
    return {
      routes
    };
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
