//用户模块路由
module.exports = (koa) => [
	{
	  method: 'POST',
	  url: '/login',
	  handler: async (ctx) => {
        await koa.exec.get_table('app_info', 'update', [{'text':'text'},'where id = ?'], ['这里是text内容',1]).then(async (res) => {
            //只有内容跟数据库不一致 changedRows才会有效
            if(res.code === 1 && res.data.changedRows > 0){
                await ctx.send(res)
            }else{
                res['data'] = null
                ctx.send(res)
            }
        })
	  }
	},
    {
      method: 'GET',
      url: '/fff',
      handler: async (ctx) => {
          //缓存到redis 60分钟 只GET请求缓存!
          await ctx.cache_sql('select * from app_info where id > ?',[0],60).then(async (res)=>{
              await ctx.send(res)
          })
      }
    },
    {
      method: 'GET',
      url: '/ddd',
      handler: async (ctx) => {
          //调用exec执行类执行 call_async 函数Promise回调
          await koa.exec.call_async('select * from app_info where id > ?',[0]).then(async (res)=> {
                await ctx.send(res)
          })
      }
    }
]
