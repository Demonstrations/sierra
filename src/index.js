'use strict'
const fs = require('fs');
const options = {
    key: fs.readFileSync('./ca/server-key.pem'),
    ca: [fs.readFileSync('./ca/ca-cert.pem')],
    cert: fs.readFileSync('./ca/server-cert.pem')
};
const server = require('https').createServer(options, (req, res) => {
    fs.readFile('./static' + (req.url.length > 1 ? req.url : '/index.html'), 
    (err, data) => {
        if(err){
            res.writeHead(500);
            return res.end('Error loading index.html', err);
        }
        res.writeHead(200);
        res.end(data);
    });
});
const app = require('socket.io')(server);
const HOST = "0.0.0.0";
const PORT = 8088;
app.on('connection', (client) => {
    client.on('message', (data) => {
        console.log(data);
        app.emit('message', data);
    })
    .on('disconnect', () => {

    });
});
server.listen(PORT, HOST, () => {
    console.log(`Server listening at:${HOST}:${PORT}`);
})