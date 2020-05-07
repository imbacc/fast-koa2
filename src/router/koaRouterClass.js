class koaRouterClass {
	constructor(module) {
		this.url = module['url']
	    this.method = module['method'] ? module['method'].toUpperCase() : 'GET'
		this.handler = module['handler']
		if(this.handler){
			this.handler = new Proxy(this.handler,{
				apply (target, _this, args) {
					// console.log('target=',target)
					// console.log('_this=',_this)
					// console.log('args=',args)
                    
					return Reflect.apply(...arguments)
				}
			})
		}else{
            this.handler = () => console.log('默认路由方法...')
        }
	}
}

module.exports = koaRouterClass