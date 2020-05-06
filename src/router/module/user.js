//用户模块路由
module.exports = (koa) => [
	{
	  method: 'GET',
	  url: '/login',
	  handler: async (ctx, next) => {
		// reply.send({api: 'is login'})
        ctx.body='这是商品页面';
        next()
	  }
	}
]
