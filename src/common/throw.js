module.exports = (koa) => {
	console.log('开启抛异常...')
    
	koa.on('error', (err, ctx) => {
      const { req, res } = ctx
	  console.error('server error', err)
      console.log(res.status, res.message)
	  // ctx.throw(res.status, res.message)
      res.status = 400
      res.body = res.message
	})
}