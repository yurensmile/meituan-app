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
          txt: '价格排序',
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
      if (item.name === 's-comment') {
        this.list.sort((a, b) => {
          return b.rate - a.rate
        })
      }
      if (item.name === 's-visit') {
        this.list.sort((a, b) => {
          return b.comment - a.comment
        })
      }
      if (item.name === 's-price') {
        if (item.txt === '价格排序') {
          item.txt = '价格最低'
          this.list.sort((a, b) => {
            return a.price - b.price
          })
          const style = document.createElement('style')
          style.innerHTML = '.s-nav-active::after{border-top-color:green}'
          document.head.appendChild(style)
        } else if (item.txt === '价格最低') {
          item.txt = '价格最高'
          this.list.sort((a, b) => {
            return b.price - a.price
          })
        } else {
          item.txt = '价格最低'
          this.list.sort((a, b) => {
            return a.price - b.price
          })
        }
      }
    }
  }
}
</script>

<style lang="scss"></style>
