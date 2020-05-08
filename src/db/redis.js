const Redis = require('redis')		//Redis驱动
const config = require('./config')	//Redis配置

const redis = Redis.createClient(config.redis.port, config.redis.host)
redis.on('error', (err) => console.log('redis err='+err))

const get_redis = async (key) => {
	const p = new Promise((resolve, reject) => {
		redis.get(key,(err, res) => {
			try{
				res = JSON.parse(res)
			}catch(e){
				
			}
			resolve(res)
		})
	})
	
	return await p.then((res) => res)
}

const set_redis = (key, value, time) => {
	redis.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
	if(time) redis.expire(key, time)
}

// const has_redis = async (key,two) => {
// 	const p = new Promise((resolve, reject) => {
// 		redis.get(key,(err, res) => resolve((res === two)))
// 	})
	
// 	return await p.then((res) => res)
// }

module.exports = (koa) => {
     koa.prototype.get_redis = get_redis
     koa.prototype.set_redis = set_redis
}

