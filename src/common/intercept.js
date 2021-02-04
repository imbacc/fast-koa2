const resultful = require('../db/resultful.js') //返回数据构造
const apitime = require('./apitime.js') //API限流
const bodyparser = require('koa-bodyparser')
const md5 = require('md5-node')
const jumpCheck = global.jump_map //跳过检测jwt

//检测CMAKE令牌
const check_cmake = async (koa, ctx, code = 'SUCCESS', next) => {
  if (code === 'JUMP_CHECK') {
    // console.log('跳过检测 token...')
    await next()
    return
  }

  console.log({ code }, '拦截状态...')

  if (code === 'SUCCESS') {
    const { request, originalUrl } = ctx

    let onlyid = md5(request.headers.authorization) || ''
    let name = `api_${md5(originalUrl + onlyid)}`
    console.log('api name=', name)
    if (request.method === 'GET') {
      //读取是否 接口有redis缓存
      await koa.get_redis(name).then(async (cache) => {
        if (cache) {
          console.log('api cache=' + name)
          ctx.send(cache)
        } else {
          await next()
        }
      })
    } else {
      //POST请求跳过检测缓存直接执行
      await next()
    }
  } else {
    ctx.code(500).send(resultful(code))
  }
}

//检测JWT令牌
const check_jwt = async (koa, head, request, ctx, next) => {
  if (request.method === 'OPTIONS') {
    ctx.code(500).send()
    return
  }
  const auth = head.authorization ? head.authorization.replace('Bearer ', '') : ''
  await koa.jwtVerify(auth).then(async (err, decoded) => {
    //没有携带令牌时 判断是否时授权路由=> 检测true为是授予令牌的接口 ,否则返回状态码 WHEREIS_CRACK
    //检测是否是version 路由
    let url_idx = request.url.indexOf('?')
    let url_str = url_idx !== -1 ? request.url.substring(0, url_idx) : request.url
    //没有携带令牌时 判断是否时授权路由=> 检测true为是授予令牌的接口 ,否则返回状态码 WHEREIS_CRACK
    let state = jumpCheck.get(url_str) ? 'JUMP_CHECK' : 'WHEREIS_CRACK'
    if (err && auth) {
      ctx.code(403).send(resultful(err.name === 'JsonWebTokenError' ? 'UNMAKETOKEN_RUBBISH' : 'UNMAKETOKEN_ERROR'))
      return
    }
    if (err === null) state = 'SUCCESS'
    await check_cmake(koa, ctx, state, next)
  })
}

module.exports = (koa) => {
  console.log('开启拦截器...')

  koa.use(bodyparser())
  koa.use(async (ctx, next) => {
    const { request, query, originalUrl } = ctx
    const { headers, url, params, body } = request
    const onlyid = md5(headers.authorization)

    try {
      if (url === '/favicon.ico') {
        ctx.code(404).send()
      } else {
        console.log({ url, params: { ...params }, body }, '请求拦截...')

        await apitime(koa, originalUrl, onlyid).then(async (bool) => {
          if (!bool) {
            // console.log('终止请求...')
            ctx.send(resultful('API_OutTime'))
          } else {
            await check_jwt(koa, headers, request, ctx, next)
          }
        })
      }
    } catch (e) {
      if (e.toString().indexOf('结束请求') === -1) {
        console.log(e)
        ctx.code(500).send(e)
      }
    }
  })
}
