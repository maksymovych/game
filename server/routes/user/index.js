const Router = require('koa-router');
const router = new Router();
const ServiceUser = require('../../services/serviceUser');
const ServiceGame = require('../../services/serviceGame');
const gameService = new ServiceGame();
const service = new ServiceUser();
const validation = require('../../validation/validationScheme');
const cookie = require('koa-cookie');

router.use(cookie.default());

router.get('/steps', async (ctx) => {

  const gameId = ctx.query.id;
  const userId = ctx.query.user;

  const response = await gameService.getSteps(gameId, userId);

  ctx.body = response;
});

router.get('/fields', async (ctx) => {
  const gameId = ctx.query.id;

  const data = await gameService.getFields(gameId);

  ctx.body = data;
});
 
router.get('/getSession', async (ctx) => {
  const id = ctx.session?.loggedUser?.id;
  console.log('id @@@@@@@@@@@@@@@@@@@@@@@@@@@@', id);
  let success = false;
  let userData = {};
  if (!!id) {
    userData = await service.getUser(id);
    success = true;
  }
  ctx.body = { success, userData };
});

router.get('/user', async (ctx) => {
  console.log('getUser', ctx.session);
  const id = ctx.query.id;

  ctx.assert(!!id, 406, 'ID not valid');

  const user = await service.getUser(id);
  ctx.body = { success: true, userData: user };
});

router.post('/auth', async (ctx) => {
  console.log('auth', ctx.request.body);
  const reqBody = await ctx.request.body;
  ctx.assert(
    reqBody.email && reqBody.password && reqBody.nickname,
    406,
    'All inputs are required'
  );

  const user = await service.login(reqBody.email, reqBody.password);

  if (user.success) {
    ctx.body = {
      success: false,
      message: 'This user already exists',
    };
  } else {
    const result = await service.addUser(reqBody);
    ctx.body = result;
  }
});

router.post('/recovery', async (ctx) => {
  const request = ctx.request.body;

  const email = validation.email(request);
  ctx.assert(!!email, 406, 'Email not valid');
  const resp = await service.recoveryPassword(email, request.newPassword);
  ctx.body = resp;
});

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body;

  ctx.assert(email && password, 406, 'Email not valid');

  const result = await service.login(email, password);

  if (result.success) {
    ctx.session.loggedUser = result.userData;
  }
  ctx.body = result;
});

router.post('/logout', async (ctx) => {
  const { id } = ctx.request.query;
  ctx.body = await service.logout(id);
  ctx.session = null;
});

router.get('/', (ctx) => {
  ctx.body = { success: true };
});

module.exports = router;
