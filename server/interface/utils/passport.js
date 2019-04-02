import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(function(username, password, done){
  let where = {
    username
  };
  let result = UserModel.findOne(where)
  if(result != null) {
    if(result.password === password) {
      return done(null, result)
    }else {
      return done(null, false, '密码错误')
    }
  }else {
    return done(null, fase, '用户不存在')
  }
}))

passport.serializeUser(function(user, done){
  done(null, user)
})

passport.deserializeUser(function(user, done){
  return done(null, user)
})

export default passport