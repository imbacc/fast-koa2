class chainThen {
    //写入send函数代替ctx.body, ctx.status赋值 链式调用
    constructor(ctx) {
       this.ctx = ctx
    }
    
    send(val = ''){
        console.log('send=', val)
        this.ctx.body = val
        throw '结束请求...'
    }
    
    code(val = 200) {
        console.log('code=', val)
        this.ctx.status = val
        return this
    }
}

module.exports = (koa) => {
    console.log('开启装饰器...') //只配置静态

    koa.context.config = { name: 'test' }
    
    koa.use(async (ctx, next) => {
        const then = new chainThen(ctx)
        koa.context.code = (val) => then.code(val)
        koa.context.send = (val) => then.send(val)
        
        await next()
    })

    // fastify.decorate('fast_sql',(sql,val,time,fastify,req,reply) => {
    // 	const exec = fastify.exec
    // 	exec.call(sql,val,(res)=> {
    // 		if(res.code === 1) fastify.set_redis(`api_${req.raw.url}`, res, time) //默认360分钟一个小时 60 * 60
    // 		reply.send(res)
    // 	})
    // })
}
