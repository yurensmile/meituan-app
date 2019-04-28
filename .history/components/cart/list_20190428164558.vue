<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="项目" prop="name" width="532"> </el-table-column>
    <el-table-column label="单价" prop="price" width="132"> </el-table-column>
    <el-table-column label="数量" width="212">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.count" size="mini" :min="0" />
      </template>
    </el-table-column>
    <el-table-column slot-scope="scope" label="总价">
      {{ scope.row.count * scope.row.price }}
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
          price: 2,
          count: 1
        },
        {
          name: 'a',
          price: 3,
          count: 2
        },
        {
          name: 'a',
          price: 4,
          count: 3
        }
      ]
    }
  }
}
</script>
