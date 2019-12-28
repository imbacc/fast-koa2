const koa = require('koa')
const app = new koa()
const port = 3000

app.use(async (ctx)=>{
	ctx.body = 'hhhhhhhhhhh...'
})

app.listen(port)
console.log(`start port ${port}...`)