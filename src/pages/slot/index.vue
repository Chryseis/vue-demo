<template>
  <child>
    <template v-slot:main:sub>
      {{ JSON.stringify(f) }}
      <el-button type="primary" @click="change">button</el-button>
    </template>
  </child>
</template>

<script>
import child from './child';
export default {
  name: 'index',
  components: {
    child
  },
  data() {
    return {
      a: { b: 1 },
      c: { d: 2 },
      d: 2,
      e: 2,
      f: [1, 2, 3, 4, 5, 6]
    };
  },
  mounted() {
    this.a = this.c;
  },
  methods: {
    change() {
      let d = this.f;
      this.f = d;
    }
  },
  watch: {
    a: {
      handler(val, oldValue) {
        console.log(val, oldValue);
        console.log('watch a');
      }
    },
    d: {
      handler(val, oldValue) {
        console.log('watch d');
      }
    },
    c: {
      handler() {
        console.log('watch c');
      }
    },
    f: {
      handler() {
        console.log('f');
      }
    }
  }
};
</script>

<style scoped></style>
