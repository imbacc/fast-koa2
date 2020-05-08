const jwt = require('jsonwebtoken')
const secret = '撒盐加密混淆-自定义内容'

module.exports = (koa) => {
    console.log('注册插件...')
    
    /**
     * JWT令牌加密
     * obj 处理对象
     * time 秒为单位
     */
    koa.prototype.jwtSign = (obj = {},time = 60) => jwt.sign(obj, secret, {expiresIn: time})
    
    /**
     * JWT令牌验证
     * token 令牌字符
     */
    koa.prototype.jwtVerify = (token) => new Promise((res)=> jwt.verify(token, secret, (err, decoded) => res(err, decoded)))
}