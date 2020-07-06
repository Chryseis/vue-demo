<template>
  <div class="form-wrapper">
    <form-info />
  </div>
</template>

<script>
import formInfo from './components/formInfo';

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    formInfo
  },
  created() {
    // window.addEventListener('popstate', function() {
    //   history.pushState(null, null, document.URL);
    // });
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
