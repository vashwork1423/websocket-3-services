import http from 'http';
import { Server } from 'socket.io';
import chalk from 'chalk';

const server = http.createServer();
const io = new Server(server, {
    path: '/'
});

const log = (msg) => console.log(chalk.bold.green.bgBlack('Service1:'), chalk.white.bgBlack(`${msg}`));

io.on('connection', client => {
    log('someone connected');

    client.on('sayHello', data => {
        log(`event: sayHello, data: ${data}`);
        client.emit('halloToYouTo', 'Hello from http://localhost:5001');
    });

    client.on('disconnect', () => {
        log('client disconnected');
    });
});

server.listen(4000);
log('started server on port 4000');
