module.exports = (koa) => {
	console.log('开启中间件...')
	
	koa.use(require('cors')())
	koa.use(require('hide-powered-by')())
	koa.use(require('x-xss-protection')())
}