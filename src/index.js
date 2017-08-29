'use strict'
const server = require('http').createServer();
const app = require('socket.io')(server);
const PORT = 8088;
app.on('connection', (client) => {
    client.on('message', (data) => {
        // console.log(data);
        app.emit('message', data);
    })
    .on('disconnect', () => {

    });
});
server.listen(PORT, () => {
    console.log('Server listening at port %d', PORT);
})