<template lang="html">
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :keyword="keyword" :type="type" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">2</el-col>
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
export default {
  components: {
    Crumbs
  },
  data() {
    return {
      keyword: '',
      type: ''
    }
  }
}
</script>
<style lang="scss"></style>
