<template>
  <div class="page-cart">
    <el-row>
      <!--是不是空呢，会不会页面错乱  -->
      <el-col v-if="1 || cart.length" :span="24" class="m-cart">
        <list />
        <p>
          应付金额：<em class="money">￥{{ total }}</em>
        </p>
      </el-col>
      <el-col v-else class="empty">购物车为空</el-col>
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
      cart: [{ name: 'a', count: 1, price: 3 }]
    }
  },
  computed: {
    total: function() {
      let total = 0
      this.cart.forEach(item => {
        return total += item.count * item.price
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/cart/index.scss';
</style>
