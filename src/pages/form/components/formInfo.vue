<template>
  <el-form
    :inline="true"
    :model="numberValidateForm"
    :rules="rules"
    ref="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item prop="name">
      <common-input v-model="numberValidateForm.name" type="input" label="姓名" />
    </el-form-item>
    <el-form-item prop="drugName">
      <common-input width="500px" v-model="numberValidateForm.drugName" label="药店" type="autocomplete" />
    </el-form-item>
    <el-form-item prop="area">
      <common-input label="区域">
        <el-select v-model="numberValidateForm.area">
          <el-option v-for="item in optionsList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </common-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="城市" prop="city">
      <el-select
        v-model="numberValidateForm.city"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          <slot>{{ item.label + '123' }}</slot>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
      <el-button @click="resetForm('numberValidateForm')">重置</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="goNext('/')">返回主页</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import commonInput from '@/component/commonInput';
export default {
  name: 'formInfo',
  components: {
    commonInput
  },
  data() {
    return {
      numberValidateForm: {
        name: '',
        drugName: '',
        area: '',
        city: []
      },
      rules: {
        name: [{ required: true, message: '请输入名字地址', trigger: 'blur' }],
        drugName: [{ required: true, message: '请输入药店地址', trigger: 'blur' }],
        area: [{ required: true, message: '请输入区域地址', trigger: 'blur' }],
        city: [{ required: true, message: '请输入区域地址', trigger: ['blur', 'change'] }]
      },
      optionsList: [
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
        }
      ],
      options: [{ value: `value:Alabama`, label: `label:Alabama` }],
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
      ]
    };
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(valid, 'valid');
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goNext(path) {
      this.$router.push(path);
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    }
  }
};
</script>

<style scoped></style>
