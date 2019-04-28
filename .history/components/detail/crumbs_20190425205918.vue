<template lang="html">
  <div class="m-crumbs">
    <el-breadcrumb-item :to="{ path: '/' }"
      >{{
        $store.state.geo.position.city.replace('市', '')
      }}美团</el-breadcrumb-item
    >
    <el-breadcrumb-item :to="{ path: '/' }"
      >{{ $store.state.geo.position.city.replace('市', '')
      }}{{ type }}</el-breadcrumb-item
    >
    <el-breadcrumb-item
      ><a href="/"
        >{{ $store.state.geo.position.city.replace('市', '')
        }}{{ decodeURIComponent(keyword) }}</a
      ></el-breadcrumb-item
    >
  </div>
</template>
<script>
export default {
  props: {
    keyword: {
      type: String,
      default: 'fa'
    },
    type: {
      type: String,
      default: 'fd'
    }
  }
}
</script>
<style></style>
