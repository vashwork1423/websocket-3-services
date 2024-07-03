import { io as ioClient } from 'socket.io-client';
import chalk from 'chalk';

const log = (msg) => console.log(chalk.bold.magenta.bgBlack('Service3:'), chalk.white.bgBlack(`${msg}`));

// Client Code
const clientAddr = 'http://localhost:5001';
const socket = ioClient(clientAddr, {
    path: '/'
});

socket.on('connect', (data) => {
    log(`connected to ${clientAddr}`);
    socket.emit('sayHello', 'Hello World from client');

    socket.on('halloToYouTo', data => {
        log(`event: halloToYouTo, data: ${data}`);
    });
});
log('started client ready');