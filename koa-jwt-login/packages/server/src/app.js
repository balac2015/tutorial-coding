import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import middleware from './middleware'
// import { logger, accessLogger} from './lib/utils/log'

import index from './routes/index'
// import users from './routes/users'

const app = new Koa()

// error handler
onerror(app)

// middleware
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(koaLogger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// 打印 logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// app.use(accessLogger())

// 自定义中间件
middleware(app)

// routes
app.use(index.routes())
// app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    // logger.error(err)
    console.error('server error', err, ctx)
})

module.exports = app
