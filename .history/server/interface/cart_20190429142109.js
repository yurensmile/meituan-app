import Router from 'koa-router';
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'
import sign from './utils/sign'

let router = new Router({ prefix: '/cart' })

router.post('/create', async ctx=> {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
        code: -1,
        msg: 'please login'
    }
  } else {
    let time = Date()
    let cartNo = md5(Math.random()*1000+time).toString()
  //  post方式获取参数
    let {
      params:{
        id,
        detail
      }
    } = ctx.query.body
    // 获取用户名
    let cart = new Cart({id, cartNo, time, user:ctx.session.passport.user, detail})
    let result = await cart.save()
    if(result) {
      ctx.body = {
        code:0,
        msg: '',
        id: cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
})

export default router
