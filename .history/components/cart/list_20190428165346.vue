<template>
  <el-table :data="cartData" style="width: 980px">
    <el-table-column prop="name" label="项目" width="532" />
    <el-table-column prop="price" label="单价" width="132" />
    <el-table-column slot-scope="scope" label="数量" width="212">
      <template>
        <el-input-number v-model="scope.row.count" :min="0" />
      </template>
    </el-table-column>
    <el-table-column label="总价" slot-scope="scope">
      <template >
        <div class="">
          {{ scope.row.price * scope.row.count }}
        </div>
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
          name: 'a',
          price: 190,
          count: 3
        }
      ]
    }
  }
}
</script>
