<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="24">
        <el-button type="primary" @click="open">点我</el-button>
        <el-button type="primary" @click="close">buttonCont</el-button>
        <el-select :multiple="true" v-model="selectArr" @change="change" placeholder="placeholder">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button type="primary" @click="setKeys">设置key</el-button>
        <el-button type="primary" @click="getKeys">获取key</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6"></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="10">
        <el-col>
          <div class="store-list">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <tree ref="tree" :data="data" show-checkbox node-key="id" accordion :filter-node-method="filterNode"></tree>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="jsx">
import { MessageBox, Message } from 'element-ui';
import area from '../../assets/area.json';
import tree from '../../component/tree/tree'

const mergeAreaData = (areaData, initData = []) => {
  return Object.keys(areaData).reduce((adapterAreaData, key) => {
    if (area[key]) {
      return adapterAreaData.concat({
        id: key,
        label: areaData[key],
        disabled:key==='110100',
        children:mergeAreaData(area[key])
      });
    } else {
      return adapterAreaData.concat({ id: key, label: areaData[key] });
    }
  }, initData);
};

export default {
  name: 'index',
  components:{
    tree
  },
  data() {
    return {
      menu: {
        title: 'hello',
        content: 'world'
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      selectArr: [],
      data: mergeAreaData(area['86']),
      filterText: ''
    };
  },
  created() {
    console.log('created')
  },
  mounted() {
    this.$refs.tree.setCheckedKeys(['110101']);
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    open() {
      MessageBox.confirm('modal1 content', 'modal1', {
        center: true,
        confirmButtonText: '好',
        cancelButtonText: '不',
        beforeClose(action, instance, done) {
          switch (action) {
            case 'confirm':
              MessageBox.close();
              Message.info('hahaha');
              break;
            case 'cancel':
            case 'close':
              MessageBox.close();
              setTimeout(() => MessageBox.alert('hahah', 'modal1'), 300);
              break;
          }
        }
      });
    },
    close() {
      MessageBox.close();
    },
    change(val) {
      console.log(val);
    },
    setKeys() {
      this.$refs.tree.setCheckedKeys(['110000', '120100']);
    },
    getKeys(){
      const ids= this.$refs.tree.getCheckedKeys(true)
      console.log(ids)
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  }
};
</script>

<style lang="scss" scoped>
.store-list {
  display: flex;
  flex-direction: column;
}
</style>
