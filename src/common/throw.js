module.exports = (koa) => {
	console.log('开启抛异常...')
    
	koa.on('error', (err, ctx) => {
	  console.log('server error', err)
      err.toString().indexOf('结束请求') !== -1 ? console.log('正常请求...') : ctx.code(500).send(err)
	})
}