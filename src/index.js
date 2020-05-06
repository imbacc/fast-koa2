const KOA = require('koa')
const koa = new KOA()
const port = 6666	//默认端口
const ip = '127.0.0.1'

require('./common/decorate')(koa) 	//注册装饰器
require('./common/throw')(koa) 		//注册抛异常
require('./common/middle')(koa) 	//注册中间件
// require('./common/tools')(koa) 		//注册插件 
require('./router/index')(koa) 		//注册路由
// require('./db/mysql')(koa) 			//注册Mysql
// require('./db/redis')(koa) 			//注册Redis

try{
	koa.listen(port, ip)
	console.log(`服务指向IP: ${ip}`)
	console.log(`服务监听端口: ${port}`)
}catch(err){
	throw err
}
