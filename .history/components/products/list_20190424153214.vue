<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name, item.active ? 's-nav-active' : '']"
        @click="navSelect(item, nav)"
      >
        {{ item.txt }}
      </dd>
    </dl>
    <ul>
      <Item v-for="(item, idx) in list" :key="idx" :meta="item" />
    </ul>
  </div>
</template>

<script>
import Item from './product.vue'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          active: true
        },
        {
          name: 's-price',
          txt: '价格最低',
          active: false
        },
        {
          name: 's-visit',
          txt: '人气最高',
          active: false
        },
        {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  async asyncData({ app }) {
    const { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  methods: {
    navSelect: function(item, nav) {
      nav.forEach(element => {
        if (element.active) {
          element.active = false
        }
      })
      item.active = true
      if (item.txt === '评价最高') {
        console.log(this.list)
        this.list.sort((a, b) => {
          return b.comment - a.comment
        })
        console.log(this.list)
      }
    }
  }
}
</script>

<style lang="scss"></style>
