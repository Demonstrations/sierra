'use strict'
const HOST = "0.0.0.0";
const PORT = 8088;
const path = require('path');
const fs = require('fs');
const options = {
    key: fs.readFileSync(path.resolve(__dirname, './ca/server-key.pem')),
    ca: [fs.readFileSync(path.resolve(__dirname, './ca/ca-cert.pem'))],
    cert: fs.readFileSync(path.resolve(__dirname, './ca/server-cert.pem'))
};
//web server
const router = require('./src/routes/router');
const Koa = require('koa');
const app = new Koa();
app.use(require('koa-logger')());
app.use(require('koa-static')(path.resolve(__dirname, './static')));
app.use(require('koa-compress')({
    flush: require('zlib').Z_SYNC_FLUSH
}));
app.use(require('kcors')({origin:'*'}));
app.use(router.routes(), router.allowedMethods());

const https = require('https');
const server = https.createServer(options, app.callback());
//websocket server
const socketServer = require('socket.io')(server);
socketServer.on('connection', (client) => {
    client.on('message', (data) => {
        console.log(data);
        socketServer.emit('message', data);
    })
    .on('disconnect', () => {

    });
});
server.listen(PORT, HOST, () => {
    console.log(`Server listening at:${HOST}:${PORT}`);
})