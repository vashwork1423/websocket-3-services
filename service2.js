import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { io as ioClient } from 'socket.io-client';
import chalk from 'chalk';

const server = http.createServer();
const ioServer = new SocketIOServer(server, {
    path: '/'
});

const log = (msg) => console.log(chalk.bold.cyan.bgBlack('Service2:'), chalk.white.bgBlack(`${msg}`));

// Server Code
ioServer.on('connection', client => {
    log('someone connected');
    client.on('sayHello', data => {
        log(`event: sayHello, data: ${data}`);
        client.emit('halloToYouTo', "hello from http://localhost:5001");
    });
    client.on('disconnect', () => {
        log('event: disconnect, client disconnected');
    });
});

// Client Code
const serverAddr = 'http://localhost:4000';
const socket = ioClient(serverAddr, {
    path: '/'
});
socket.on('connect', () => {
    log(`connected to ${serverAddr}`);

    socket.emit('sayHello', 'Hello World from client');

    socket.on('halloToYouTo', data => {
        log(`event: helloToYouTo, ${data}`);
    });
});

server.listen(5001);
log('started server on port 5001');
