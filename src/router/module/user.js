const { user: api } = require('../../common/api')

//用户模块路由
module.exports = (koa) => [
  {
    ...api.upp,
    handler: async (ctx) => {
      await koa.exec.get_table('update', ['app_info', ['text'], 'where id = ?'], ['text', 1]).then((res) => {
        //只有内容跟数据库不一致 changedRows才会有效
        if (res.code === 1 && res.data.changedRows > 0) {
          ctx.send(res)
        } else {
          res['data'] = null
          ctx.send(res)
        }
      })
    }
  },
  {
    ...api.fff,
    handler: async (ctx) => {
      //缓存到redis 60分钟 只GET请求缓存!
      await ctx.cache_sql('select * from app_info where id > ?', [0], 60).then(async (res) => {
        await ctx.send(res)
      })
    }
  },
  {
    ...api.ddd,
    handler: async (ctx) => {
      //调用exec执行类执行 call 函数Promise回调
      await koa.exec.call('select * from app_info where id > ?', [0]).then(async (res) => {
        await ctx.send(res)
      })
    }
  }
]
