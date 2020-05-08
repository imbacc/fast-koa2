const KOA_AK = require('koa')
const koa = new KOA_AK()
const port = 6666	//默认端口
const ip = '127.0.0.1'

require('./common/decorate')(koa) 	//注册装饰器
require('./common/intercept')(koa)  //注册拦截器
require('./common/throw')(koa) 		//注册抛异常
require('./router/index')(koa) 		//注册路由
require('./common/tools')(KOA_AK) 	//注册插件 
require('./db/mysql')(KOA_AK) 	    //注册Mysql
require('./db/redis')(KOA_AK) 		//注册Redis

try{
	koa.listen(port, ip)
	console.log(`服务指向IP: ${ip}`)
	console.log(`服务监听端口: ${port}`)
}catch(err){
	throw err
}
