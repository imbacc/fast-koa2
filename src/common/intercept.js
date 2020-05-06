const resultful = require('../db/resultful.js')	//返回数据构造
const apitime = require('./apitime')			//API限流

//检测CMAKE令牌
const check_cmake = (fastify,head,req,reply,code = 'SUCCESS',next) => {
	if(code === 'JUMP_CHECK'){
		console.log('跳过检测 token...')
		next()
		return
	}
	
	console.log({ id: req.id, code: code },'拦截状态...')
	
	if(code === 'SUCCESS'){
		let md5 = reply.body ? reply.body.md5 : ''
		let name = 'api_'+req.raw.originalUrl+md5
		console.log('api name=',name)
		
		if(req.req.method === 'GET'){
			//读取是否 接口有redis缓存
			fastify.get_redis(name).then((cache)=>{
				if(cache) {
					reply.header('Cache-control', 'max-age=3600')
					reply.header('Last-Modified', new Date().toUTCString())
					console.log('api cache='+name)
					reply.send(cache)
				}else{
					next()
				}
			})
		}else{
			//POST请求跳过检测缓存直接执行
			next()
		}
	}else{
		reply.code(500).send(resultful(code))
	}
}

//检测JWT令牌
const check_jwt = (fastify,head,req,reply,next) => {
	req.jwtVerify((err, decoded) => {
		//没有携带令牌时 判断是否时授权路由=> 检测true为是授予令牌的接口 ,否则返回状态码 WHEREIS_CRACK
		let state = req.req.url.indexOf('version') !== -1 ? 'SUCCESS' : 'WHEREIS_CRACK'
		if(decoded) state = 'SUCCESS'
		check_cmake(fastify,head,req,reply,state,next)
	})
}

module.exports = (koa) => {
	console.log('开启拦截器...')
	
	//请求
	fastify.addHook('onRequest', (req, reply, next) => {
		let url = req.req.url
		if(url === '/favicon.ico') {
			reply.code(404).send()
		}else{
			console.log({ url: url, params: {...req.query}, body: req.body , id: req.id }, '请求拦截...')
			const head = req.headers
			
			// if(head.uuid === undefined){
			// 	reply.code(401).send()
			// }
			
			apitime(fastify,url,head.uuid).then((bool)=>{
				if(!bool){
					// console.log('终止请求...')
					reply.send(resultful('API_OutTime'))
				}else{
					check_jwt(fastify,head,req,reply,next)
				}
			})
		}
	})

	//响应 找不到next方法
	// fastify.addHook('onResponse', (res, next) => {
	// 	console.log({ id: res.id },'响应拦截...')
	// 	console.log(res)
	// 	// next()
	// })
}