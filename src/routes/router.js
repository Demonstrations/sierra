'use strict'
const router = require('koa-router');

const TestController = require('../controller/testController');
const testController = new TestController();

router.get('/test/:id', async (ctx, next) => {
    await testController.delete(ctx);
});