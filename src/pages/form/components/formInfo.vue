<template>
  <el-form
    :inline="true"
    :model="numberValidateForm"
    ref="numberValidateForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item>
      <common-input v-model="name" type="input" label="姓名" />
    </el-form-item>
    <el-form-item>
      <common-input v-model="drugName" label="药店" type="autocomplete" />
    </el-form-item>
    <el-form-item>
      <common-input label="区域">
        <el-select v-model="area">
          <el-option v-for="item in optionsList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </common-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input type="age" v-model.number="numberValidateForm.age" autocomplete="off"></el-input>
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
        age: ''
      },
      name: '',
      drugName: '',
      area: '',
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
      ]
    };
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
    }
  }
};
</script>

<style scoped></style>
