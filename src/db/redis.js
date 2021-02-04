const Redis = require('redis') //Redis驱动
const { redis } = require('../common/config') //Redis配置

const redisCli = Redis.createClient(redis.port, redis.host)
redisCli.on('error', (err) => console.log('redisCli err=' + err))

const get_redis = async (key) => {
  const p = new Promise((resolve, reject) => {
    redisCli.get(key, (err, res) => {
      try {
        res = JSON.parse(res)
      } catch (e) {}
      resolve(res)
    })
  })
  return await p.then((res) => res)
}

const set_redis = (key, value, time) => {
  redisCli.set(key, typeof value === 'object' ? JSON.stringify(value) : value)
  if (time) redisCli.expire(key, time)
}

module.exports = (koa) => {
  koa.prototype.get_redis = get_redis
  koa.prototype.set_redis = set_redis
}
