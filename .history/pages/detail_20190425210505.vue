<template lang="html">
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :keyword="keyword" :type="type" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <summa />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">3</el-col>
    </el-row>
    <el-row>
      <el-col :span="24">4</el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/detail/crumbs.vue'
import Summa from '@/components/detail/summary.vue'
export default {
  components: {
    Crumbs,
    Summa
  },
  data() {
    return {
      keyword: '',
      type: '',
      meta: ''
    }
  }
}
</script>
<style lang="scss"></style>
