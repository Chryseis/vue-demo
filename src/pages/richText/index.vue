<template>
  <div class="input-message">
    <div class="toolbar" ref="toolbar">
      <i class="el-icon-picture"></i>
      <i class="el-icon-s-comment"></i>
    </div>
    <div class="editor" ref="editor"></div>
    <div class="buttonbar">
      <el-button>发送消息</el-button>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import Quill from 'quill';

let quill = null;

export default {
  name: 'richText',
  props: {
    value: {
      type: String,
      default: 'sb'
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      quill = new Quill(this.$refs.editor, {
        modules: {
          toolbar: this.$refs.toolbar,
          keyboard: {}
        },
        placeholder: '请输入消息',
        scrollingContainer: this.$refs.editor
      });

      quill.on('text-change', (delta, oldDelta, source) => {
        console.log(delta, oldDelta, source, quill.getText());
      });

      quill.setText(this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-message {
  display: flex;
  flex-direction: column;
  height: 192px;
  background-color: #fafbfc;

  .toolbar {
    display: flex;
    align-items: center;
    padding: 0 15px;
    height: 32px;

    i {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .editor {
    flex: 1;
    height: auto;
    overflow-y: auto;

    /deep/.ql-editor {
      font-size: 14px;
      overflow: initial;
      &.ql-blank {
        &::before {
          font-style: normal !important;
        }
      }
    }
  }

  .buttonbar {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
  }
}
</style>
