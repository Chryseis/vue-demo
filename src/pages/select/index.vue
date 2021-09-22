<template>
  <el-main>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-select
          v-model="value"
          multiple
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
          @remove-tag="remove"
          @change="change"
        >
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            <slot>{{ item.label + '123' }}</slot>
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="value2" placeholder="请选择">
          <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      options: [{ value: `value:Alabama`, label: `label:Alabama` }],
      value: ['value:Alabama'],
      list: [],
      loading: false,
      states: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ],
      value2: '选项3',
      options2: [
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
      ]
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` }
    })
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    remove(val) {
      console.log(val)
    },
    change(val) {
      console.log(val)
      console.log(this.value)
    },
    input(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped></style>
