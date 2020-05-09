//版本模块路由
module.exports = (koa) => [
    {
        method: 'GET',
        url: '/version',
        handler: async (ctx) => {
           const token = await koa.jwtSign({dd:11}, 60 * 60 * 1) //秒为单位 1小时
           await koa.exec.get_table('app_info', 'select', [[], 'del', 'where id = ?'], [10086]).then(async (res) => {
               res['token'] = token
               await ctx.send(res)
           })
        }
    }
]
