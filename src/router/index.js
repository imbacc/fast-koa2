const router = require('koa-router')()
const koaRouterClass = require('./koaRouterClass.js')

const routerFactory = (r) => r.method === 'GET' ? router.get(r.url,r.handler) : router.post(r.url,r.handler)

module.exports = (koa) => {

    const list = [
        require('./module/user')(koa),		//用户模块路由
        // require('./module/version')(koa),	//版本模块路由
    ]
	
	// router.get('/hello/:name', async (ctx, next) => {
	//   var name = ctx.params.name; // 获取请求参数
	//   ctx.response.body = `<h5>Hello, ${name}!</h5>`;
	// });
    
	
	console.time('生产路由')
	list.forEach((info)=> {
        info.map((module)=> {
            const koaRouter = new koaRouterClass(module,router)
            routerFactory(koaRouter)
            // koaRouter(this.url,this.handler)
        })
    })//循环子模块路由配置 生产路由
	console.timeEnd('生产路由')
	
	koa.use(router.routes()).use(router.allowedMethods())
	
	console.log(list)	//打印所有路由
}