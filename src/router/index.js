const router = require('koa-router')()
const koaRouterClass = require('./koaRouterClass.js')

const routerFactory = (r) => r.method === 'GET' ? router.get(r.url,r.handler) : router.post(r.url,r.handler)

module.exports = (koa) => {

    const list = [
        require('./module/user')(koa),		//用户模块路由
        require('./module/version')(koa),	//授权模块路由
    ]
	
	console.time('生产路由')
	list.forEach((info)=> {
        //循环子模块路由配置 生产路由
        info.map((module)=> routerFactory(new koaRouterClass(module,router)))
    })
	console.timeEnd('生产路由')
	
	koa.use(router.routes()).use(router.allowedMethods())
	
	// console.log(list)	//打印所有路由
}