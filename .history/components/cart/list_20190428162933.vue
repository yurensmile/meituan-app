<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="项目" prop="name" width="532"> </el-table-column>
    <el-table-column label="单价" prop="price" width="132"> </el-table-column>
    <el-table-column prop="count" label="数量" width="212">
        <template>
            <el-input-number v-model="num1" :min="0"/>
        </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      search: ''
    }
  }
}
</script>
