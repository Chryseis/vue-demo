<template>
  <div class="form-wrapper">
    <form-info />
    <div @click="onClick">click</div>
  </div>
</template>

<script>
import formInfo from './components/formInfo';

export default {
  data() {
    return {
      a: true
    };
  },
  methods: {
    onClick() {
      this.a = !this.a;
      console.log('click');
    }
  },
  components: {
    formInfo
  },
  created() {
    // window.addEventListener('popstate', function() {
    //   history.pushState(null, null, document.URL);
    // });
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeRouteLeave(to, from, next) {
    // next(false);
    console.log('leave');
    // next(from.path);
    this.$confirm('hahaha', 'confirm').then(_ => next());
  }
};
</script>

<style scoped></style>
