'use strict'
const koa = require('koa.io');
const app = koa();
const PORT = 8088;
const room = "test";
app.io.use(function *(next){
    this.join(room, () => {
        // console.log(this.rooms);
    });
    yield next;
});
app.io.route('message', function *(){
    this.broadcast.to(room).emit('message', this.data[0]);
});
app.listen(PORT, () => {
    console.log('Server listening at port %d', PORT);
})