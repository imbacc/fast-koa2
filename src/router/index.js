const router = require('koa-router')()

class koaRouterClass {
	constructor(url,handler,method) {
		this.url = url
	    this.method = method.toUpperCase() || 'GET'
		this.handler = handler
		if(handler){
            console.log(1111111)
			// this.handler = new Proxy(handler,{
			// 	apply (target, _this, args) {
			// 		// console.log('apply---------------')
			// 		// console.log('target=',target)
			// 		// console.log('_this=',_this)
			// 		// console.log('args=',args)
			// 		return Reflect.apply(...arguments)
			// 	}
			// })
		}else{
            handler = () => console.log('默认路由方法...')
        }
		const koaRouter = this.method === 'GET' ? router.get : router.post;
		return koaRouter(this.url,this.handler)
	}
}

module.exports = (koa) => {
    // require('./common/intercept')(koa, router) 	//注册拦截器

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
            console.log(module)
        })
    })//循环子模块路由配置 生产路由
	console.timeEnd('生产路由')
	
	koa.use(router.routes()).use(router.allowedMethods())
	
	// console.log(list)	//打印所有路由
}