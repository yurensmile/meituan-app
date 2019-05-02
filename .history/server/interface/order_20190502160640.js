import Router from 'koa-router';
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import Order from '../dbs/models/order'
import md5 from 'crypto-js/md5'

let router = new router({prefix: '/order'})

router.get('/createOrder', async ctx => {
    let {id, price, count} = ctx.query
    let time = Date()
    let orderID = md5(Math.random()*1000 + time).toString()
    // 登录验证
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code: -1,
            msg: 'please login'
        }
    } else {
        let findCart = await Cart.findOne({cartNo:id})
        let order = new Order({
            id: orderID,
            count,
            total: price * count,
            
        })
    }
})