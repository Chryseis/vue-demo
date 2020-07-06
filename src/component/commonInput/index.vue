<template>
  <div class="drugstore-input-wrapper" :class="{ focus: isFocus }">
    <div class="label">
      <slot name="label">
        <span class="label-text" :class="[labelAlign]">
          {{ label }}
        </span>
      </slot>
    </div>
    <div class="controller">
      <slot>
        <template v-if="type === 'input'">
          <el-input
            :value="value"
            :placeholder="placeholder"
            @focus="focus"
            @blur="blur"
            @input="val => $emit('input', val)"
          ></el-input>
        </template>
        <template v-else>
          <el-autocomplete
            @focus="focus"
            @blur="blur"
            :value="value"
            valueKey="name"
            @input="val => $emit('input', val)"
            @select="item => $emit('select', item)"
            :trigger-on-focus="false"
            :fetch-suggestions="queryDrugName || querySearch"
            class="inline-input"
            :placeholder="placeholder"
          ></el-autocomplete>
        </template>
      </slot>
    </div>
  </div>
</template>

<script lang="jsx">
export default {
  name: 'drugstore-input',
  props: {
    label: {
      type: String
    },
    labelAlign:{
      type:String,
      default:'left'
    },
    queryDrugName: {
      type: Function
    },
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'input'
    },
    placeholder: {
      type: String,
      default: '请输入'
    }
  },
  data() {
    return {
      isFocus: false
    };
  },
  methods: {
    focus() {
      this.isFocus = true;
    },
    blur() {
      this.isFocus = false;
    },
    querySearch() {
      // 默认搜索药店
    }
  }
};
</script>

<style lang="scss" scoped>
.drugstore-input-wrapper {
  display: flex;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    border: 1px solid #bdbdbd;
  }

  &.focus {
    border: 1px solid #44b85b;
  }

  .label {
    position: relative;
    padding: 0 12px;
    display: flex;
    align-items: center;
    width: 80px;
    color: #707070;
    box-sizing: border-box;

    &::after {
      position: absolute;
      top: 50%;
      right: 0;
      width: 1px;
      height: 14px;
      transform: translateY(-50%);
      background-color: #f2f2f2;
      content: '';
    }

    .label-text {
      display: inline-block;
      width: 100%;

      &.center {
        text-align: center;
      }

      &.left {
        text-align: left;
      }

      &.justify {
        text-align-last: justify;
      }

      &.right {
        text-align: right;
      }
    }
  }

  .controller {
    flex: 1;

    /deep/input {
      border: none !important;
    }
  }
}
</style>
