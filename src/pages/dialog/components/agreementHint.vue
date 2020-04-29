<template>
  <el-dialog class="dialog" width="400px" :visible.sync="hintVisible">
    <template #title>
      <div class="hint-title">
        提示
      </div>
    </template>
    <template #default>
      <div class="hint-content">
        若您不签署《免责声明协议》，后续将无法正常使用平台药师进行处方审核；您也可使用自己的药师进行审方
      </div>
    </template>
    <template #footer>
      <div class="hint-footer">
        <el-button class="button" @click="closeHint">
          我知道了
        </el-button>
        <el-button type="primary" @click="linkTo">
          立即签署
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import Vue from 'vue';
import { Dialog, Button } from 'element-ui';

Vue.use(Dialog);
Vue.use(Button);

export default {
  name: 'agreementConfirm',
  data() {
    return {
      hintVisible: false
    };
  },
  methods: {
    openHint() {
      this.hintVisible = true;
    },
    closeHint() {
      this.hintVisible = false;
    },
    linkTo() {
      alert(this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog {
  width: 100%;

  .hint-title {
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    color: #242424;
  }

  .el-dialog__body {
    padding: 0;
  }

  .hint-content {
    padding: 0 49px;
    text-align: center;
    line-height: 24px;
    color: #242424;
  }

  .hint-footer {
    display: flex;
    justify-content: space-between;
    padding: 0 49px;
  }
}
</style>
