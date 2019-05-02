import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix: '/geo'})

const sign = '8e48004fd0e582f26fa50affe7e15813'

router.get('/getPosition', async ctx => {
  let {
    status1,
    data:{
      ip
    }
  } = await axios.get( `http://cp-tools.cn/geo/getPosition?sign=${sign}`)
  // status1 is undefined ,its really strange
  console.log(ip+"  "+status1)
  if(status1===undefined){
    let {code:status,data:{region,city}} = await axios.get(`http://ip.taobao.com/service/getIpInfo.php?ip=${ip}`)
    if (status === 0)  {
      ctx.body = {
        province:region,
        city
      }
    } else {
      ctx.body = {
        province:"北京",
        city
      }
  }
  }
})

router.get('/province', async ctx => {
  // let province = await Province.find();
  // ctx.body = {
  //   province: province.map(item => {
  //     return {
  //       id: item.id,
  //       name: item.value[0]
  //     }
  //   })
  // }
  let {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status===200?province:[]
  }
})

router.get('/province/:id', async ctx => {
  let {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if(status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/city', async ctx => {
  let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  }
})

router.get('/hotCity', async (ctx) => {
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }
  let {status, data: {
      hots
    }} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
  }
})

router.get('/menu', async ctx => {
  let {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (status===200) {
    ctx.body={
      menu
    }
  }else{
    ctx.body={
      menu:[]
    }
  }
})

export default router;
