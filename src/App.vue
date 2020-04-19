<template>
  <div id="app">
    <el-button type="primary" @click="open(1)">button1</el-button>
    <el-button type="primary" @click="open(2)">button2</el-button>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'element-ui';
import AgreementDialog from './components/agreementDialog';

Vue.use(Button);

export default {
  name: 'App',
  components: {},
  methods: {
    open(id) {
      AgreementDialog.show({ id });
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
