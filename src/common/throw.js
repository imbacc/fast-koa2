module.exports = (koa) => {
	console.log('开启抛异常...')
	
	koa.on('error', (err, ctx) => {
	  console.error('server error', err, ctx)
	  ctx.throw(400, 'name required')
	  // ctx.throw(400, 'name required', { user: user })
	})
}