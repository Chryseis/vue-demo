<template>
  <div>
    <el-button type="primary" @click="open('12')">buttonCont</el-button>
    <el-button type="primary" @click="goNext()">去下一页</el-button>
  </div>
</template>

<script>
import AgreementDialog from '@/pages/dialog/components/agreementDialog';
export default {
  name: 'Dialog',
  methods: {
    open(id) {
      AgreementDialog.show({ id });
    },
    goNext(path) {
      this.$router.push(path);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log('enter');
    });
  }
};
</script>

<style scoped></style>
