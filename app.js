const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io').listen(server);

let CONNECTIONS = [];

io.sockets.on('connection', (socket) => {
    console.log('Success conection');
    CONNECTIONS.push(socket);

    socket.on('disconnect', (data) => {
        CONNECTIONS.splice(CONNECTIONS.indexOf(socket), 1);
        console.log('Disconnect');       
    });

    socket.on('send message', (data) => {
        io.sockets.emit('add message', { msg: data.msg, name: data.name, className: data.className });
    });
});


app.use(express.static(path.resolve(__dirname, 'client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

server.listen(8080, (req, res) => {
    console.log('Server has been started');
});



