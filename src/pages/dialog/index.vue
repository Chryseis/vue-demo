<template>
  <el-button type="primary" @click="open('12')">buttonCont</el-button>
</template>

<script>
import AgreementDialog from '@/pages/dialog/components/agreementDialog';
export default {
  name: 'Dialog',
  methods: {
    open(id) {
      AgreementDialog.show({ id });
    }
  }
};
</script>

<style scoped></style>
