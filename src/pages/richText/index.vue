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
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';

Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

let quill = null;

export default {
  name: 'richText',
  props: {
    defaultValue: {
      type: String,
      default: ''
    },
    maxLength: {
      type: Number,
      default: 250
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
          keyboard: {
            bindings: {
              send: {
                key: 13,
                handler: (range, content) => {
                  this.send();
                  console.log('send', quill.getContents(), quill.getText().replace(/\n/g, '').length);
                }
              },
              newline: {
                key: 13,
                ctrlKey: true,
                handler: range => {
                  quill.insertText(range.index, '\n');
                }
              }
            }
          },
          imageDropAndPaste: {
            handler: (imageDataUrl, type, imageData) => {
              console.log(imageDataUrl, type, imageData);
              const filename = ` img_${+new Date()}`;
              const file = imageData.toFile(filename);
            }
          }
        },
        placeholder: '请输入消息',
        scrollingContainer: this.$refs.editor
      });

      quill.on('text-change', (delta, oldDelta, source) => {
        if (quill.getText().length > this.maxLength) {
          quill.deleteText(this.maxLength, 1);
        }
      });

      quill.setText(this.defaultValue);
    },
    send() {
      quill.getContents().forEach(({ insert }) => {
        typeof insert === 'object'
          ? this.$emit('sendImage')
          : this.$emit('send', quill.getText().replace(/(^\s*)|(\s*$)/g, ''));
        quill.setText('');
      });
    },
    addImage() {}
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
