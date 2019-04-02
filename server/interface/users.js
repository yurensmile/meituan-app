import Router from 'koa-router';
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import  User from '../dbs/models/users'
import PassPort from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({prefix: '/users'})

let Store = new Redis().client
router.post('/signup', async (ctx)=>{
  const {username, password, email, code} = ctx.request.body;
  if(code){
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if(new Date().getTime()-saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: "验证码已过期，请重新获取"
        }
        return false
      }

    }else {
      ctx.body = {
        code: -1,
        msg: "请填写正确的验证码"
      }
    }
  }else {
    ctx.body = {
      code: -1,
      msg: "请填写验证码"
    }
  }

  let user = await User.find({username})
  if(user.length){
    ctx.body = {
      code: -1,
      msg: '该用户名已被使用'
    }
    return
  }

  let user = await User.create({username, password, email})
  if (user) {
    let res = await axios.post('/users/signin', {username, password})
    if(res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: "注册成功"
        user: res.data.user
      }
    }else{
      ctx.body = {
        code: -1,
        msg: '注册失败'
      }
    }
  }
})

router.post('/signin', async (ctx, next) => {
  return PassPort.authenticate('local', function(err, user, info, status){
    if(err){
      ctx.body = {
        code: -1,
        msg: err
      }
    }else {
      if(user) {
        ctx.body = {
          ctx.body = {
            code: 0,
            msg: "登录成功",
            user
          }
          return ctx.login(user)
        } else {
          ctx.body = {
            code: 1,
            msg: info
          }
        }
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证码请求过于频繁，请一分钟后再试'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    service: 'qq',
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `"认证邮件"<${Email.smtp.user}>`,
    to: ko.email,
    subject: '这是你在网站上的注册码',
    html: `你在虚假美团网站上的邀请码为${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)

    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，注意查收，有效期为一分钟'
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})


router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {username, email} = ctx.session.passport.user
    ctx.body = {
      user:username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
