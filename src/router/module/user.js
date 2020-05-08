//用户模块路由
module.exports = (koa) => [
	{
	  method: 'POST',
	  url: '/login',
	  handler: async (ctx) => {
        await ctx.send('aaaaad')
	  }
	},
    {
      method: 'GET',
      url: '/fff',
      handler: async (ctx) => {
        await ctx.send('fffff')
        // await koa.exec.update('app_info', ['text','where id = ?'], ['这里是text内容',1]).then(async (res) => {
        //     await ctx.send(res)
        // })
      }
    }
]
