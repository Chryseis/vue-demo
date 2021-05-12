<template>
  <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" border>
    <el-table-column header-align="center" width="80" align="center" prop="columnProp" label="">
      <el-radio v-model="radio"></el-radio>
    </el-table-column>
    <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
    <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'zy-doctor-table',
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄',
              children: [
                {
                  id: 33,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄',
                  children: [
                    { id: 35, date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
                    { id: 36, date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' }
                  ]
                },
                {
                  id: 34,
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
                }
              ]
            },
            {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      radio: false
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log('beforeRouteLeave');
    next();
  }
};
</script>

<style lang="less" scoped></style>
