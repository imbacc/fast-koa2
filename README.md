# hey kong<br>
# 整理了架构

```
  ├── node_modules                依赖包
  ├── src                         源码
  │   ├── common                  结构
  │   │      ├── apitime.js             利用redis限流
  │   │      ├── decorate.js            装饰器
  │   │      ├── intercept.js           拦截器
  │   │      ├── throw.js               异常处理
  │   │      ├── tools.js               定义插件
  │   ├── db                      数据库
  │   │    ├── bean.js                  虚拟抽象实体类
  │   │    ├── config.js                配置数据库信息
  │   │    ├── exec.js                  执行SQL事务封装
  │   │    ├── mysql.js                 架入mysql驱动
  │   │    ├── redis.js                 架入redis驱动
  │   │    ├── resultful.js             定义返回格式
  │   ├── router                  路由
  │   │      ├── module                 路由子模块文件夹
  │   │      ├── index.js               路由入口文件
  │   │      ├── koaRouterClass.js      代理路由函数生成路由
  │   ├── index.js                koa2入口
  ├── .gitignore                  忽略提交到git目录文件
  ├── package.json                依赖包及配置信息文件
```