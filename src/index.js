const KOA_AK = require('koa')
const koa = new KOA_AK()

const {
  listen: { port, ip }
} = require('./common/config')

require('./common/decorate')(koa) //注册装饰器
require('./common/intercept')(koa) //注册拦截器
require('./common/throw')(koa) //注册抛异常
require('./router/index')(koa) //注册路由
require('./common/plugin')(KOA_AK) //注册插件
require('./db/mysql')(KOA_AK) //注册Mysql
require('./db/redis')(KOA_AK) //注册Redis

try {
  // 监听端口并启动
  koa.listen(port, ip)
  console.log(`服务指向IP: ${ip}`)
  console.log(`服务监听端口: ${port}`)
} catch (err) {
  throw err
}
