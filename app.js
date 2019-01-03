const Koa = require("koa");
// 用于打开网站
const opn = require("opn");
const Monk = require("monk");


const Router = require('koa-router');
const router=new Router();
const db = new Monk("localhost:27017/todos"); //链接到库
const todos = db.get('todos'); //表

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
});

// 对于任何请求，app将调用该异步函数处理请求：
router.get("/", async ctx => {
    ctx.response.type = "text/html";
    ctx.body = "hi";
});
router.get("/a", async ctx => {
    let st = await todos.find({},function (err,docs) {
        console.log('docs',docs);        
    });
    console.log('st',st);
    ctx.response.type = "application/json";
    ctx.body = st;
});
// 加载路由中间件
//解释：app.use 加载用于处理http請求的middleware（中间件），当一个请求来的时候，会依次被这些 middlewares处理。
app.use(router.routes());

// 在端口3000监听:
app.listen(3000);
opn("http://localhost:3000/");
console.log("app started at port 3000...");
