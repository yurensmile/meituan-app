<template>
  <div class="m-geo">
    <!-- 获取城市名，固定的写法 -->
    <i class="el-icon-location" /> {{ $store.state.geo.position.city }}
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
    [香河 廊坊 天津]
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss"></style>
