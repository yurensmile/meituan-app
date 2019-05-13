import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import Users from '../../dbs/models/users'

passport.use(new LocalStrategy(function(username, password, done){
  let where = {
    username
  };
  console.log("before username" + username)
  console.log("before password" + password)
  console.log("before where" + where)
  let result = Users.findOne(where)
  console.log('result: ' + Object.keys(result))
  console.log('result username: ' + result.username)
  console.log('result email: ' + result.email)
  console.log('password: '+ password)
  if(result != null) {
    if(result.password === password) {
      return done(null, result)
    }else {
      return done(null, false, '密码错误')
    }
  }else {
    return done(null, false, '用户不存在')
  }
}))
 
passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(user, done){
  done(null, user)
})

export default passport
