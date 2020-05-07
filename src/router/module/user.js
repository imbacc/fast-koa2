//用户模块路由
module.exports = (koa) => [
	{
	  method: 'GET',
	  url: '/login',
	  handler: async (ctx, next) => {
        ctx.send('aaaaad')
        
        next()
	  }
	}
]
