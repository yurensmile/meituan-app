<template>
  <div class="m-artistic">
    <dl v-for="(item, idx) in artistics" :key="idx" @mouseenter="enter">
      <dt :class="item.type">{{ item.name }}</dt>
      <div v-if="kind">
        <template v-for="(hotel, i) in item.children">
          <img :key="i" :src="hotel.img" alt="hahahh" />
        </template>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      artistics: [
        {
          type: 'date',
          name: '约会聚餐',
          children: [
            {
              img:
                'http://p0.meituan.net/msmerchant/f271cc526b6ad104ccd0f849f0317e42320376.jpg@552w_312h_1e_1c'
            },
            {
              img:
                'http://p1.meituan.net/msmerchant/86a89e16649fe2f1444b46d9497f4f26172723.jpg@552w_312h_1e_1c'
            },
            {
              img:
                'http://p0.meituan.net/msmerchant/f682553974f941fb5f616991dc65876b1319400.jpg@552w_312h_1e_1c'
            }
          ]
        },
        {
          type: 'SPA',
          name: '丽人SPA',
          children: [
            {
              img:
                'http://p0.meituan.net/deal/cc3eecb02b38562290bb72ad5758944f68974.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C552w_312h_1e_1c'
            },
            {
              img:
                'http://p0.meituan.net/merchantpic/031973b3029e341f8e46775259d48a3b361560.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C552w_312h_1e_1c'
            }
          ]
        }
      ]
    }
  },
  computed: {
    childitem: function() {
      return this.artistics.filter(item => this.kind === item.type)
    }
  },
  methods: {
    enter: function(e) {
      this.kind = e.target.querySelector('dt').className
    }
  }
}
</script>

<style lang="scss" scoped></style>
