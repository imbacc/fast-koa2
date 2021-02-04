const { version: api } = require('../../common/api')

//版本模块路由
module.exports = (koa) => [
  {
    ...api.version,
    handler: async (ctx) => {
      const token = await koa.jwtSign({ dd: 11 }, 60 * 60 * 1) //秒为单位 1小时
      await koa.exec.get_table('select', ['app_info', [], 'where id = ?'], [ctx.query.id]).then(async (res) => {
        res['token'] = token
        await ctx.send(res)
      })
    }
  }
]
