import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    modules: {
      geo,
      home
    },
    actions: {
      async nuxtServerInit({ commit }, { req, app, store }) {
        // const cityPos = store.state.geo.position.city

        const {
          status,
          data: { province, city }
        } = await app.$axios.get('/geo/getPosition')
        commit('geo/setPosition', status === 200 ? { city, province } : {})

        const {
          status: status2,
          data: { menu }
        } = await app.$axios.get('/geo/menu')
        commit('home/setMenu', status2 === 200 ? menu : [])
        const {
          status: status3,
          data: { result }
        } = await app.$axios.get('/search/hotPlace', {
          params: {
            city: store.state.geo.position.city.toString().replace('市', '')
          }
        })
        console.log(store.state.geo.position.city)
        commit('home/setHotPlace', status3 === 200 ? result : [])
      }
    }
  })

export default store
