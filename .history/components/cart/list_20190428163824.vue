<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="项目" prop="name" width="532"> </el-table-column>
    <el-table-column label="单价" prop="price" width="132"> </el-table-column>
    <el-table-column label="数量" width="212">
      <template>
        <el-input-number v-model="num1" :min="0" />
      </template>
    </el-table-column>
    <el-table-column label="总价">
      {{ num1 }}
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: 'a',
          price: 2
        },
        {
          name: 'a',
          price: 2
        },
        {
          name: 'a',
          price: 2
        }
      ],
      num1: 1
    }
  }
}
</script>
