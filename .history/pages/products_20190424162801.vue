<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <categroy :types="types" :areas="areas" />
      <List :list="list" @curLoc="curLoc" />
    </el-col>
    <el-col :span="5">
      <a-map v-if="point.length" :width="230" :height="290" :point="point" />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import AMap from '@/components/public/map.vue'
export default {
  components: {
    Crumbs,
    Categroy,
    List,
    AMap
  },
  data() {
    return {
      keyword: '',
      list: [],
      areas: [],
      types: [],
      point: []
    }
  },
  async asyncData(ctx) {
    const keyword = ctx.query.keyword
    const city = ctx.store.state.geo.position.city
    const {
      status,
      data: { count, pois }
    } = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })
    const {
      status2,
      data: { areas, types }
    } = await ctx.$axios.get('/categroy/crumbs', {
      params: {
        city
      }
    })
    console.log(status + ' ' + status2)
    if (status === 200 && count > 0) {
      return {
        list: pois
          .filter(item => item.photos.length > 0)
          .map(item => {
            return {
              type: item.type,
              img: item.photos[0].url,
              name: item.name,
              comment: Math.floor(Math.random() * 10000),
              rate: Number(item.biz_ext.rating),
              price: Number(item.biz_ext.cost),
              scene: item.tag,
              tel: item.tel,
              status: '可订明日',
              location: item.location,
              module: item.type.split(';')[0]
            }
          }),
        keyword,
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        types: types.filter(item => item.type !== '').slice(0, 5),
        point: (pois.find(item => item.location).location || '').split(',')
      }
    }
  },
  methods: {
    curLoc: loc => {
      console.log("i am here" + loc)
      this.point = loc.split(',')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/products/index.scss';
</style>
