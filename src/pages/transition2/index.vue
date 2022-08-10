<template>
  <div>
    <el-button @click="onChange">transition</el-button>
    <transition name="slide-left">
      <!--      <div :key="text">{{ text }}</div>-->
      <keep-alive>
        <componentA :key="key" class="child-view" @change="onChange" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import componentA from './components/componentA'
import componentB from './components/componentB'

export default {
  name: 'index',
  data() {
    return {
      show: false,
      key: '123123123'
    }
  },
  components: {
    componentA
  },
  methods: {
    onChange() {
      this.show = !this.show
      this.key = '313123123'
    }
  }
}
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}

.child-view {
  position: absolute;
  transition: all 0.75s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
