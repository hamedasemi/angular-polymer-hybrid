import Koa from 'koa'
import stream from 'stream'
import fs from 'fs'
import Router from 'koa-router'
//HTTSP already provided by Google Cloude

const app = new Koa()
const router = new Router()
// x-response-time
app.use(async function (ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() - start
    ctx.set(`X-Response-Time`, `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

router.get(`/`, function (ctx, next) {

    try {
        ctx.set(`Content-Type`, `text/html; charset=utf-8`)
        ctx.body = `<h1>Hello World!</h1>`
        ctx.body = fs.createReadStream(`./components/app-stream/index.html`)
        ctx.status = 200

    } catch (err) {
        console.error(err)
    }
})

router.get(`/about`, function (ctx, next) {
    console.log(`statusCode:`, ctx.statusCode)
    console.log(`headers:`, ctx.headers)
    ctx.body = `Hi About Page`
    console.log(`About`)
})

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(8080)