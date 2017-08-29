'use strict'
const PORT = 8088;
const WebSocket = require('ws');
const app = new WebSocket.Server({port:PORT});
app.broadcast = (data) => {
    app.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN)
            client.send(data);
    })
}
app.on('connection', (client) => {
    client.on('message', (data) => {
        // console.log(data);
        app.broadcast(data);
    });
});