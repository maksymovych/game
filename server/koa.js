const loginRouter = require('./routes/user');
const koaBody = require('koa-body');

const cors = require('@koa/cors');
const Koa = require('koa');
const session = require('koa-session2');
const Store = require('./routes/store/store.js');
//const cookieParser = require('cookie-parser');

const app = new Koa();

app.keys = ['cookies key'];
app.proxy = true;
app.use(
  cors({
    credentials: true,
    allowHeaders: ['Content-Type'],
  })
);

const CONFIG = {
  maxAge: 86400000,
  store: new Store(),
  sameSite: null,
  secure: false,
  key: 'battleShip',
  httpOnly: false,
};

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});
app.on('error', (err, ctx) => {
  console.log(err, ctx);
});

//app.use(cookieParser());
app.use(koaBody());
app.use(session(CONFIG, app));
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

module.exports = app;