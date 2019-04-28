<template>
  <div class="page-cart">
    <el-row>
        <!--是不是空呢，会不会页面错乱  -->
      <el-col v-if="cart.length" :span="24" class="m-cart">1</el-col>
      <el-col v-else>2</el-col>
    </el-row>
  </div>
</template>
<script>
import List from '@/components/cart/list.vue'
export default {
  components: {
    List
  },
  data() {
    return {
      cart: []
    }
  }
}
</script>
