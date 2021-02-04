class sendChain {
  //写入send函数代替ctx.body, ctx.status赋值 可链式调用 ctx.code(200).send('xxx')
  constructor(ctx) {
    this.ctx = ctx
    this.ctx.set('Content-Type', 'application/json')
  }

  send(val = '') {
    try {
      // console.log('send=',val)
      this.ctx.body = val
      throw new Error('结束请求')
    } catch (e) {
      //TODO handle the exception
    }
  }

  code(val = 200) {
    this.ctx.status = val
    return this
  }
}

const md5 = require('md5-node')

// 缓存get请求 配置到全局
const _cacheSql = (sql, val, time, ctx, koa) => {
  return koa.exec.call(sql, val).then((res) => {
    const { request, originalUrl } = ctx
    const onlyid = md5(request.headers.authorization) || ''
    if (res.code === 1) koa.set_redis(`api_${md5(originalUrl + onlyid)}`, res, time) //默认360分钟一个小时 60 * 60
    return res
  })
}

module.exports = (koa) => {
  console.log('开启装饰器...') //只配置静态

  // fastify.child.send -> solo
  koa.context.child = { send: 'solo' }

  //带入code,send函数
  koa.use(async (ctx, next) => {
    const then = new sendChain(ctx)
    koa.context.code = (val) => then.code(val)
    koa.context.send = (val) => Promise.resolve(then.send(val))
    koa.context.cache_sql = (sql, val, time = 1) => _cacheSql(sql, val, time, ctx, koa)

    await next()
  })
}
