const jwt = require('jsonwebtoken')
const { jwtkey, swagger } = require('./config')

module.exports = (koa) => {
  console.log('注册插件...')

  /**
   * JWT令牌加密
   * obj 处理对象
   * time 秒为单位
   */
  koa.prototype.jwtSign = (obj = {}, time = 60) => jwt.sign(obj, jwtkey, { expiresIn: time })

  /**
   * JWT令牌验证
   * token 令牌字符
   */
  koa.prototype.jwtVerify = (token) => new Promise((res) => jwt.verify(token, jwtkey, (err, decoded) => res(err, decoded)))
}
